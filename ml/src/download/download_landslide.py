import requests
import json
from pathlib import Path


# Washington Geological Survey
URL = (
    "https://gis.dnr.wa.gov/site3/rest/services/"
    "Geology/Landslide_Inventory_Database/"
    "FeatureServer/131/query"
)

# Output directory
OUTPUT_DIR = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "raw"
    / "landslide"
)

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_FILE = OUTPUT_DIR / "washington_landslides.json"


# Seattle-area bounding box
# longitude: -122.50 to -122.20
# latitude : 47.45 to 47.80
#
# The service uses a Washington State coordinate system,
# so we request the result geometry in WGS84 (EPSG:4326).

params = {
    "where": "1=1",
    "outFields": "*",
    "returnGeometry": "true",
    "outSR": "4326",
    "f": "geojson",
    "resultRecordCount": 2000,
    "resultOffset": 0
}


print("=" * 50)
print("DOWNLOADING LANDSLIDE DATA")
print("=" * 50)

print("Requesting Washington Geological Survey data...")

all_features = []

offset = 0
page_size = 2000

while True:

    params["resultOffset"] = offset
    params["resultRecordCount"] = page_size

    print(
        f"Requesting records {offset} to "
        f"{offset + page_size - 1}..."
    )

    response = requests.get(
        URL,
        params=params,
        timeout=60
    )

    print("HTTP status:", response.status_code)

    response.raise_for_status()

    data = response.json()

    if "features" not in data:
        print("No features returned.")
        print(data)
        raise SystemExit(1)

    page_features = data["features"]

    print(
        "Records received:",
        len(page_features)
    )

    all_features.extend(page_features)

    if len(page_features) < page_size:
        break

    offset += page_size


features = all_features

print(
    "Total Washington landslide records returned:",
    len(features)
)

# --------------------------------------------------
# Filter to Seattle-area bounding box
# --------------------------------------------------

MIN_LAT = 47.45
MAX_LAT = 47.80

MIN_LON = -122.50
MAX_LON = -122.20


seattle_features = []

for feature in features:

    geometry = feature.get("geometry")

    if not geometry:
        continue

    # Polygon geometry can contain nested coordinates.
    # For now we use the geometry centroid supplied by
    # calculating a simple average of all coordinates.

    coordinates = geometry.get("coordinates")

    if not coordinates:
        continue

    def collect_points(obj):
        points = []

        if (
            isinstance(obj, list)
            and len(obj) >= 2
            and isinstance(obj[0], (int, float))
            and isinstance(obj[1], (int, float))
        ):
            points.append(obj)

        elif isinstance(obj, list):
            for item in obj:
                points.extend(collect_points(item))

        return points

    points = collect_points(coordinates)

    if not points:
        continue

    avg_lon = sum(point[0] for point in points) / len(points)
    avg_lat = sum(point[1] for point in points) / len(points)

    if (
        MIN_LAT <= avg_lat <= MAX_LAT
        and MIN_LON <= avg_lon <= MAX_LON
    ):

        feature["properties"]["centroid_latitude"] = avg_lat
        feature["properties"]["centroid_longitude"] = avg_lon

        seattle_features.append(feature)


print(
    "Seattle-area landslide records:",
    len(seattle_features)
)


# --------------------------------------------------
# Save
# --------------------------------------------------

output_data = {
    "type": "FeatureCollection",
    "features": seattle_features
}

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        output_data,
        file,
        indent=2
    )


print()
print("Saved to:")
print(OUTPUT_FILE)

print()
print("=" * 50)
print("DOWNLOAD COMPLETE")
print("=" * 50)