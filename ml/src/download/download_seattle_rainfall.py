import requests
from pathlib import Path
import json


# NOAA GHCN-Daily station
STATION_ID = "USW00024233"

START_DATE = "1978-01-01"
END_DATE = "2003-12-31"

URL = (
    "https://www.ncei.noaa.gov/access/services/data/v1"
)

OUTPUT_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_daily_rainfall.json"
)


params = {
    "dataset": "daily-summaries",
    "stations": STATION_ID,
    "startDate": START_DATE,
    "endDate": END_DATE,
    "format": "json",
    "includeAttributes": "false",
    "units": "metric"
}


print("=" * 60)
print("DOWNLOADING SEATTLE DAILY RAINFALL")
print("=" * 60)

print("Station:", STATION_ID)
print("Start:", START_DATE)
print("End:", END_DATE)

response = requests.get(
    URL,
    params=params,
    timeout=120
)

print("HTTP status:", response.status_code)

response.raise_for_status()

data = response.json()

print("Records downloaded:", len(data))


with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        data,
        file,
        indent=4
    )


print()
print("Saved to:")
print(OUTPUT_FILE)

print()
print("=" * 60)
print("DOWNLOAD COMPLETE")
print("=" * 60)