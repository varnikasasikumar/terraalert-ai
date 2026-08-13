import pandas as pd
from pathlib import Path

# --------------------------------------------------
# Paths
# --------------------------------------------------

input_file = Path("../../data/processed/combined_features.csv")
output_file = Path("../../data/processed/final_training_data.csv")

# --------------------------------------------------
# Load combined dataset
# --------------------------------------------------

df = pd.read_csv(input_file)

df["timestamp"] = pd.to_datetime(df["timestamp"])

# --------------------------------------------------
# Create prototype flood labels
# --------------------------------------------------

df["flood"] = 0

# Harvey event-period candidate
harvey_mask = (
    (df["timestamp"] >= "2017-08-26 00:00:00") &
    (df["timestamp"] <= "2017-08-27 23:59:59")
)

df.loc[harvey_mask, "flood"] = 1

# --------------------------------------------------
# Check class distribution
# --------------------------------------------------

print("========================================")
print("FINAL TRAINING DATASET")
print("========================================")

print("\nShape:")
print(df.shape)

print("\nClass distribution:")
print(df["flood"].value_counts())

print("\nMissing values:")
print(df.isnull().sum())

# --------------------------------------------------
# Save
# --------------------------------------------------

df.to_csv(output_file, index=False)

print("\nSaved to:")
print(output_file)