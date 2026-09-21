import pandas as pd
from pathlib import Path

# --------------------------------------------------
# Paths
# --------------------------------------------------

input_file = Path("../../data/processed/gridrad_features.csv")
output_file = Path("../../data/processed/training_data.csv")

# --------------------------------------------------
# Load radar features
# --------------------------------------------------

df = pd.read_csv(input_file)

# --------------------------------------------------
# Create prototype labels
# --------------------------------------------------

# 0 = normal/non-event candidate period
# 1 = Harvey event-period candidate
#
# IMPORTANT:
# These are prototype/event-period labels.
# They are NOT ground-truth flood inundation labels.

df["timestamp"] = pd.to_datetime(df["timestamp"])

df["flood"] = 0

# Harvey event-period samples
harvey_mask = (
    (df["timestamp"] >= "2017-08-26 00:00:00") &
    (df["timestamp"] <= "2017-08-27 23:59:59")
)

df.loc[harvey_mask, "flood"] = 1

# --------------------------------------------------
# Save training dataset
# --------------------------------------------------

df.to_csv(output_file, index=False)

print("========================================")
print("TRAINING DATASET CREATED")
print("========================================")

print("\nDataset:")
print(df)

print("\nClass distribution:")
print(df["flood"].value_counts())

print("\nSaved to:")
print(output_file)