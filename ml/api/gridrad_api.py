import os
from flask import Flask, request, jsonify
import xarray as xr
import numpy as np
from pathlib import Path
from datetime import datetime

app = Flask(__name__)

GRIDRAD_FOLDER = Path(__file__).resolve().parent.parent / "data" / "raw" / "gridrad"

@app.route('/extract_radar', methods=['POST'])
def extract_radar():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON payload provided"}), 400

        latitude = data.get("latitude")
        longitude = data.get("longitude")
        timestamp_str = data.get("timestamp")

        if latitude is None or longitude is None or timestamp_str is None:
            return jsonify({"error": "Missing required fields (latitude, longitude, timestamp)"}), 400

        # Create bounding box (1.5x1.5 degrees centered on lat/lon)
        lat_min = latitude - 0.75
        lat_max = latitude + 0.75
        
        # GridRad uses 0-360 for longitude
        lon_gridrad = longitude if longitude >= 0 else 360 + longitude
        lon_min = lon_gridrad - 0.75
        lon_max = lon_gridrad + 0.75

        # Format the timestamp to match the file names
        # Format: nexrad_3d_v3_1_YYYYMMDDTHHMMSSZ.nc
        # e.g. 2017-08-26T11:00:00Z -> nexrad_3d_v3_1_20170826T110000Z.nc
        # We assume the timestamp passed in ends with Z or can be converted.
        # Let's try to parse it first.
        try:
            # Handle various ISO formats
            if timestamp_str.endswith("Z"):
                dt = datetime.fromisoformat(timestamp_str[:-1])
            else:
                dt = datetime.fromisoformat(timestamp_str)
            
            # Format to YYYYMMDDTHHMMSSZ
            file_time_str = dt.strftime("%Y%m%dT%H%M%S") + "Z"
        except ValueError:
            return jsonify({"error": f"Invalid timestamp format: {timestamp_str}"}), 400

        filename = f"nexrad_3d_v3_1_{file_time_str}.nc"
        file_path = GRIDRAD_FOLDER / filename

        if not file_path.exists():
            print(f"GridRad file not found: {file_path}")
            return jsonify({"error": f"GridRad file not found for timestamp {timestamp_str}"}), 404

        print(f"Processing GridRad file: {file_path}")

        dataset = xr.open_dataset(file_path)

        # Sparse radar data
        indices = dataset["index"].values
        reflectivity = dataset["Reflectivity"].values

        # Decode sparse indices
        altitude_indices, latitude_indices, longitude_indices = np.unravel_index(
            indices,
            (
                dataset.sizes["Altitude"],
                dataset.sizes["Latitude"],
                dataset.sizes["Longitude"]
            )
        )

        # Convert grid indices to coordinates
        latitudes = dataset["Latitude"].values[latitude_indices]
        longitudes = dataset["Longitude"].values[longitude_indices]

        # Bounding box mask
        region_mask = (
            (latitudes >= lat_min) &
            (latitudes <= lat_max) &
            (longitudes >= lon_min) &
            (longitudes <= lon_max)
        )

        # Select region reflectivity
        region_reflectivity = reflectivity[region_mask]

        # Remove invalid values
        region_reflectivity = region_reflectivity[
            np.isfinite(region_reflectivity)
        ]

        dataset.close()

        # Check if we have any valid radar points in the area
        if len(region_reflectivity) == 0:
            return jsonify({
                "reflectivityMean": 0.0,
                "reflectivityMax": 0.0,
                "reflectivityMin": 0.0,
                "reflectivityStd": 0.0,
                "reflectivityMedian": 0.0,
                "reflectivityGe20Pct": 0.0,
                "reflectivityGe30Pct": 0.0,
                "reflectivityGe40Pct": 0.0,
                "radarObservationCount": 0
            })

        # Calculate features
        mean_reflectivity = float(np.mean(region_reflectivity))
        max_reflectivity = float(np.max(region_reflectivity))
        min_reflectivity = float(np.min(region_reflectivity))
        std_reflectivity = float(np.std(region_reflectivity))
        median_reflectivity = float(np.median(region_reflectivity))

        percent_20 = float((
            np.sum(region_reflectivity >= 20)
            / len(region_reflectivity)
        ) * 100)

        percent_30 = float((
            np.sum(region_reflectivity >= 30)
            / len(region_reflectivity)
        ) * 100)

        percent_40 = float((
            np.sum(region_reflectivity >= 40)
            / len(region_reflectivity)
        ) * 100)

        observation_count = len(region_reflectivity)

        return jsonify({
            "reflectivityMean": mean_reflectivity,
            "reflectivityMax": max_reflectivity,
            "reflectivityMin": min_reflectivity,
            "reflectivityStd": std_reflectivity,
            "reflectivityMedian": median_reflectivity,
            "reflectivityGe20Pct": percent_20,
            "reflectivityGe30Pct": percent_30,
            "reflectivityGe40Pct": percent_40,
            "radarObservationCount": observation_count
        })

    except Exception as e:
        print(f"Error processing GridRad: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
