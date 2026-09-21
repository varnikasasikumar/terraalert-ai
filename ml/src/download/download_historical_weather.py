import requests
import pandas as pd
from pathlib import Path

# --------------------------------------------------
# Houston representative point
# --------------------------------------------------

LATITUDE = 29.76
LONGITUDE = -95.37

# --------------------------------------------------
# Historical period covering our radar data
# --------------------------------------------------

START_DATE = "2017-08-20"
END_DATE = "2017-08-27"

# --------------------------------------------------
# Open-Meteo Historical Weather API
# --------------------------------------------------

URL = "https://archive-api.open-meteo.com/v1/archive"

params = {
    "latitude": LATITUDE,
    "longitude": LONGITUDE,
    "start_date": START_DATE,
    "end_date": END_DATE,

    "hourly": (
        "temperature_2m,"
        "relative_humidity_2m,"
        "precipitation,"
        "surface_pressure,"
        "wind_speed_10m,"
        "soil_moisture_0_to_7cm"
    ),

    "timezone": "GMT",
    "temperature_unit": "celsius",
    "wind_speed_unit": "ms",
    "precipitation_unit": "mm",

    # Use ERA5-Land for land/surface variables
    "models": "era5"
}

print("Requesting historical weather data...")

response = requests.get(
    URL,
    params=params,
    timeout=120
)

print("HTTP status:", response.status_code)

response.raise_for_status()

data = response.json()

# --------------------------------------------------
# Convert hourly data to DataFrame
# --------------------------------------------------

hourly = data["hourly"]

weather_df = pd.DataFrame(hourly)

weather_df["timestamp"] = pd.to_datetime(
    weather_df["time"]
)

weather_df = weather_df.drop(
    columns=["time"]
)

# --------------------------------------------------
# Save
# --------------------------------------------------

output_folder = Path("../../data/processed")
output_folder.mkdir(
    parents=True,
    exist_ok=True
)

output_file = (
    output_folder /
    "historical_weather.csv"
)

weather_df.to_csv(
    output_file,
    index=False
)

print("\n========================================")
print("HISTORICAL WEATHER DATA CREATED")
print("========================================")

print(weather_df.head())

print("\nNumber of hourly records:")
print(len(weather_df))

print("\nColumns:")
print(weather_df.columns.tolist())

print("\nSaved to:")
print(output_file)