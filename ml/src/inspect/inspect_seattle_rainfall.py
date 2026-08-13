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


print("=" * 60)
print("SEATTLE RAINFALL DATA INSPECTION")
print("=" * 60)

print("Total records:", len(data))


if data:

    print("\nColumns in first record:")

    for key in data[0].keys():
        print("-", key)


    print("\nFirst 5 records:")

    for record in data[:5]:
        print(record)


    print("\nLast 5 records:")

    for record in data[-5:]:
        print(record)


print("\n" + "=" * 60)