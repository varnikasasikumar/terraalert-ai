import json
from pathlib import Path


DATA_FILE = (
    Path(__file__).resolve().parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "washington_landslides.json"
)


with open(DATA_FILE, "r", encoding="utf-8") as file:
    data = json.load(file)


features = data["features"]


print("=" * 50)
print("LANDSLIDE DATA INSPECTION")
print("=" * 50)

print("Number of landslide records:", len(features))

if len(features) > 0:

    first_properties = features[0]["properties"]

    print("\nColumns:")
    for column in first_properties.keys():
        print("-", column)

    print("\nFirst record:")
    print(first_properties)

    print("\nGeometry:")
    print(features[0]["geometry"])

print("\n" + "=" * 50)

# Check important fields

dates = []
types = []
triggers = []
gradients = []
aspects = []

for feature in features:

    properties = feature["properties"]

    if properties.get("LANDSLIDE_DATE") is not None:
        dates.append(properties["LANDSLIDE_DATE"])

    if properties.get("LANDSLIDE_TYPE") is not None:
        types.append(properties["LANDSLIDE_TYPE"])

    if properties.get("LANDSLIDE_TRIGGER_EVENT") is not None:
        triggers.append(properties["LANDSLIDE_TRIGGER_EVENT"])

    if properties.get("GRADIENT_DEGREES") is not None:
        gradients.append(properties["GRADIENT_DEGREES"])

    if properties.get("ASPECT") is not None:
        aspects.append(properties["ASPECT"])


print("Records with landslide date:", len(dates))
print("Records with landslide type:", len(types))
print("Records with trigger event:", len(triggers))
print("Records with gradient:", len(gradients))
print("Records with aspect:", len(aspects))

print("\nLandslide dates:")
for date in dates:
    print(date)