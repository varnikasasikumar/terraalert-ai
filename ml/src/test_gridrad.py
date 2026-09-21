import xarray as xr
import numpy as np
import pandas as pd
from pathlib import Path

# --------------------------------------------------
# Paths
# --------------------------------------------------

gridrad_folder = Path("../data/raw/gridrad")
output_folder = Path("../data/processed")

output_folder.mkdir(parents=True, exist_ok=True)

# --------------------------------------------------
# Houston region
# --------------------------------------------------

LAT_MIN = 29.0
LAT_MAX = 30.5

LON_MIN = 264.0
LON_MAX = 265.5

# --------------------------------------------------
# Get all GridRad files
# --------------------------------------------------

files = sorted(gridrad_folder.glob("*.nc"))

print("GridRad files found:", len(files))

if not files:
    print("No GridRad files found!")
    exit()

# Store one feature row for each file
feature_rows = []

# --------------------------------------------------
# Process each GridRad file
# --------------------------------------------------

for file_path in files:

    print("\nProcessing:", file_path.name)

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

    # Houston mask
    houston_mask = (
        (latitudes >= LAT_MIN) &
        (latitudes <= LAT_MAX) &
        (longitudes >= LON_MIN) &
        (longitudes <= LON_MAX)
    )

    # Select Houston reflectivity
    houston_reflectivity = reflectivity[houston_mask]

    # Remove invalid values
    houston_reflectivity = houston_reflectivity[
        np.isfinite(houston_reflectivity)
    ]

    # --------------------------------------------------
    # Calculate features
    # --------------------------------------------------

    mean_reflectivity = np.mean(houston_reflectivity)
    max_reflectivity = np.max(houston_reflectivity)
    min_reflectivity = np.min(houston_reflectivity)
    std_reflectivity = np.std(houston_reflectivity)
    median_reflectivity = np.median(houston_reflectivity)

    percent_20 = (
        np.sum(houston_reflectivity >= 20)
        / len(houston_reflectivity)
    ) * 100

    percent_30 = (
        np.sum(houston_reflectivity >= 30)
        / len(houston_reflectivity)
    ) * 100

    percent_40 = (
        np.sum(houston_reflectivity >= 40)
        / len(houston_reflectivity)
    ) * 100

    # --------------------------------------------------
    # Get timestamp
    # --------------------------------------------------

    timestamp = dataset["time"].values[0]

    # --------------------------------------------------
    # Create feature row
    # --------------------------------------------------

    feature_rows.append({
        "timestamp": timestamp,
        "reflectivity_mean": mean_reflectivity,
        "reflectivity_max": max_reflectivity,
        "reflectivity_min": min_reflectivity,
        "reflectivity_std": std_reflectivity,
        "reflectivity_median": median_reflectivity,
        "reflectivity_ge_20_pct": percent_20,
        "reflectivity_ge_30_pct": percent_30,
        "reflectivity_ge_40_pct": percent_40,
        "radar_observation_count": len(houston_reflectivity)
    })

    print("Houston observations:", len(houston_reflectivity))
    print("Mean reflectivity:", mean_reflectivity)
    print("Maximum reflectivity:", max_reflectivity)

    dataset.close()

# --------------------------------------------------
# Create DataFrame
# --------------------------------------------------

df = pd.DataFrame(feature_rows)

# Sort by time
df = df.sort_values("timestamp")

# --------------------------------------------------
# Save CSV
# --------------------------------------------------

output_file = output_folder / "gridrad_features.csv"

df.to_csv(output_file, index=False)

print("\n========================================")
print("FEATURE DATASET CREATED")
print("========================================")

print(df)

print("\nSaved to:")
print(output_file)