import pandas as pd
import joblib
from pathlib import Path


# --------------------------------------------------
# Load trained model
# --------------------------------------------------

model_file = Path("../../models/flood_random_forest.pkl")

model = joblib.load(model_file)

print("Flood prediction model loaded successfully!")


# --------------------------------------------------
# Load our dataset
# --------------------------------------------------

data_file = Path(
    "../../data/processed/final_training_data.csv"
)

df = pd.read_csv(data_file)


# --------------------------------------------------
# Feature columns
# --------------------------------------------------

features = [
    "reflectivity_mean",
    "reflectivity_max",
    "reflectivity_min",
    "reflectivity_std",
    "reflectivity_median",
    "reflectivity_ge_20_pct",
    "reflectivity_ge_30_pct",
    "reflectivity_ge_40_pct",
    "radar_observation_count",

    "temperature_2m",
    "relative_humidity_2m",
    "precipitation",
    "surface_pressure",
    "wind_speed_10m",
    "soil_moisture_0_to_7cm"
]


# --------------------------------------------------
# Select one sample
# --------------------------------------------------

sample = df[features].iloc[[12]]


# --------------------------------------------------
# Make prediction
# --------------------------------------------------

prediction = model.predict(sample)[0]

probability = model.predict_proba(sample)[0]


# --------------------------------------------------
# Display result
# --------------------------------------------------

print("\n========================================")
print("TERRAALERT AI - FLOOD PREDICTION")
print("========================================")

print("\nPrediction:")

if prediction == 1:
    print("FLOOD RISK")
else:
    print("NORMAL")


print("\nProbability:")

print(
    f"Normal: {probability[0] * 100:.2f}%"
)

print(
    f"Flood : {probability[1] * 100:.2f}%"
)