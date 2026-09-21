import json
from pathlib import Path


FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "washington_landslides.json"
)


with open(
    FILE,
    "r",
    encoding="utf-8"
) as file:

    data = json.load(file)


features = data["features"]


print("=" * 60)
print("SEATTLE LANDSLIDE LOCATION INSPECTION")
print("=" * 60)

print("Total records:", len(features))


with_date = 0
with_coordinates = 0
with_both = 0


for feature in features:

    properties = feature.get(
        "properties",
        {}
    )

    geometry = feature.get(
        "geometry"
    )

    date = properties.get(
        "LANDSLIDE_DATE"
    )

    latitude = properties.get(
        "centroid_latitude"
    )

    longitude = properties.get(
        "centroid_longitude"
    )


    if date:
        with_date += 1


    if (
        latitude is not None
        and longitude is not None
    ):
        with_coordinates += 1


    if (
        date
        and latitude is not None
        and longitude is not None
    ):
        with_both += 1


print()
print(
    "Records with landslide date:",
    with_date
)

print(
    "Records with coordinates:",
    with_coordinates
)

print(
    "Records with both:",
    with_both
)


print()
print(
    "First 10 records with coordinates:"
)


count = 0


for feature in features:

    properties = feature.get(
        "properties",
        {}
    )

    latitude = properties.get(
        "centroid_latitude"
    )

    longitude = properties.get(
        "centroid_longitude"
    )

    if (
        latitude is not None
        and longitude is not None
    ):

        print()
        print(
            "Landslide ID:",
            properties.get("LANDSLIDE_ID")
        )

        print(
            "Date:",
            properties.get("LANDSLIDE_DATE")
        )

        print(
            "Latitude:",
            latitude
        )

        print(
            "Longitude:",
            longitude
        )

        print(
            "Type:",
            properties.get("LANDSLIDE_TYPE")
        )

        count += 1

        if count >= 10:
            break


print()
print("=" * 60)