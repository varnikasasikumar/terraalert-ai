import json
from pathlib import Path


RAINFALL_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_daily_rainfall.json"
)


with open(
    RAINFALL_FILE,
    "r",
    encoding="utf-8"
) as file:
    data = json.load(file)


fields = [
    "TMAX",
    "TMIN",
    "TAVG",
    "AWND"
]


print("=" * 60)
print("SEATTLE WEATHER FIELD INSPECTION")
print("=" * 60)

print("Total records:", len(data))

for field in fields:

    available = 0
    missing = 0

    for record in data:

        value = record.get(field)

        if value is None or str(value).strip() == "":
            missing += 1
        else:
            available += 1

    print()
    print(field)
    print("Available:", available)
    print("Missing:", missing)


print()
print("=" * 60)