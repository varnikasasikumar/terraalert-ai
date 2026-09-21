import json
from pathlib import Path


FEATURE_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "processed"
    / "seattle_landslide_rainfall_features.json"
)


with open(
    FEATURE_FILE,
    "r",
    encoding="utf-8"
) as file:

    data = json.load(file)


print("=" * 60)
print("LANDSLIDE RAINFALL FEATURE INSPECTION")
print("=" * 60)

print("Total records:", len(data))


print("\nFirst 5 records:")

for record in data[:5]:
    print(record)


print("\nLast 5 records:")

for record in data[-5:]:
    print(record)


print("\nFeature names:")

if data:

    for key in data[0].keys():
        print("-", key)


print("\n" + "=" * 60)