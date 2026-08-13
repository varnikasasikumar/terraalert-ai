import json
from pathlib import Path
from datetime import datetime, timedelta


BASE_DIR = Path(__file__).resolve().parent.parent.parent

LABEL_FILE = (
    BASE_DIR
    / "data"
    / "raw"
    / "landslide"
    / "seattle_landslide_labels.json"
)

RAINFALL_FILE = (
    BASE_DIR
    / "data"
    / "raw"
    / "landslide"
    / "seattle_daily_rainfall.json"
)

OUTPUT_FILE = (
    BASE_DIR
    / "data"
    / "processed"
    / "seattle_landslide_rainfall_features.json"
)


print("=" * 60)
print("CREATING LANDSLIDE WEATHER FEATURES")
print("=" * 60)


# ---------------------------------------------------------
# Load labels
# ---------------------------------------------------------

with open(
    LABEL_FILE,
    "r",
    encoding="utf-8"
) as file:

    labels = json.load(file)


# ---------------------------------------------------------
# Load NOAA weather data
# ---------------------------------------------------------

with open(
    RAINFALL_FILE,
    "r",
    encoding="utf-8"
) as file:

    rainfall_data = json.load(file)


# ---------------------------------------------------------
# Create date -> weather dictionary
# ---------------------------------------------------------

daily_weather = {}

for record in rainfall_data:

    date = record.get("DATE")

    if date is None:
        continue

    try:

        rainfall = float(record["PRCP"])
        tmax = float(record["TMAX"])
        tmin = float(record["TMIN"])

    except (ValueError, TypeError, KeyError):

        continue

    daily_weather[date] = {
        "rainfall": rainfall,
        "tmax": tmax,
        "tmin": tmin
    }


print("Label samples:", len(labels))
print("Weather records:", len(daily_weather))


# ---------------------------------------------------------
# Calculate accumulated rainfall
# ---------------------------------------------------------

def accumulated_rainfall(target_date, days):

    total = 0.0

    for offset in range(days):

        current_date = (
            target_date
            - timedelta(days=offset)
        )

        date_string = current_date.strftime(
            "%Y-%m-%d"
        )

        weather = daily_weather.get(
            date_string
        )

        if weather is not None:

            total += weather["rainfall"]

    return total


# ---------------------------------------------------------
# Create feature records
# ---------------------------------------------------------

features = []

missing_dates = []

for label in labels:

    date_string = label["date"]

    target_date = datetime.strptime(
        date_string,
        "%Y-%m-%d"
    ).date()

    weather = daily_weather.get(
        date_string
    )

    if weather is None:

        missing_dates.append(
            date_string
        )

        continue


    record = {

        "date": date_string,

        "rainfall_1d":
            accumulated_rainfall(
                target_date,
                1
            ),

        "rainfall_3d":
            accumulated_rainfall(
                target_date,
                3
            ),

        "rainfall_7d":
            accumulated_rainfall(
                target_date,
                7
            ),

        "rainfall_15d":
            accumulated_rainfall(
                target_date,
                15
            ),

        "rainfall_32d":
            accumulated_rainfall(
                target_date,
                32
            ),

        "temperature_max":
            weather["tmax"],

        "temperature_min":
            weather["tmin"],

        "landslide":
            label["landslide"]
    }


    features.append(record)


# ---------------------------------------------------------
# Create output directory
# ---------------------------------------------------------

OUTPUT_FILE.parent.mkdir(
    parents=True,
    exist_ok=True
)


# ---------------------------------------------------------
# Save feature dataset
# ---------------------------------------------------------

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        features,
        file,
        indent=4
    )


print()
print("Feature records created:", len(features))
print(
    "Dates missing weather:",
    len(missing_dates)
)


print()
print("First 5 feature records:")

for record in features[:5]:

    print(record)


print()
print("Saved to:")
print(OUTPUT_FILE)

print()
print("=" * 60)
print("FEATURE CREATION COMPLETE")
print("=" * 60)