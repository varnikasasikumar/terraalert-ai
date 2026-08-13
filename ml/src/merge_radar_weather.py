import pandas as pd
from pathlib import Path

# --------------------------------------------------
# Paths
# --------------------------------------------------

radar_file = Path("../data/processed/gridrad_features.csv")
weather_file = Path("../data/processed/historical_weather.csv")
output_file = Path("../data/processed/combined_features.csv")

# --------------------------------------------------
# Load datasets
# --------------------------------------------------

radar_df = pd.read_csv(radar_file)
weather_df = pd.read_csv(weather_file)

# --------------------------------------------------
# Convert timestamps
# --------------------------------------------------

radar_df["timestamp"] = pd.to_datetime(
    radar_df["timestamp"]
)

weather_df["timestamp"] = pd.to_datetime(
    weather_df["timestamp"]
)

# --------------------------------------------------
# Merge using timestamp
# --------------------------------------------------

combined_df = pd.merge(
    radar_df,
    weather_df,
    on="timestamp",
    how="left"
)

# --------------------------------------------------
# Display result
# --------------------------------------------------

print("========================================")
print("RADAR + WEATHER DATASET")
print("========================================")

print("\nShape:")
print(combined_df.shape)

print("\nColumns:")
print(combined_df.columns.tolist())

print("\nMissing values:")
print(combined_df.isnull().sum())

print("\nFirst rows:")
print(combined_df.head())

# --------------------------------------------------
# Save
# --------------------------------------------------

combined_df.to_csv(
    output_file,
    index=False
)

print("\nSaved to:")
print(output_file)