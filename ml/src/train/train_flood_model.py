import pandas as pd
import joblib

from pathlib import Path

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


# --------------------------------------------------
# Paths
# --------------------------------------------------

input_file = Path("../../data/processed/final_training_data.csv")

model_folder = Path("../../models")
model_folder.mkdir(parents=True, exist_ok=True)

model_file = model_folder / "flood_random_forest.pkl"


# --------------------------------------------------
# Load dataset
# --------------------------------------------------

df = pd.read_csv(input_file)

print("========================================")
print("FLOOD ML MODEL TRAINING")
print("========================================")

print("\nDataset shape:")
print(df.shape)


# --------------------------------------------------
# Select features
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

X = df[features]

y = df["flood"]


# --------------------------------------------------
# Train / test split
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)


print("\nTraining samples:", len(X_train))
print("Testing samples :", len(X_test))


# --------------------------------------------------
# Create Random Forest
# --------------------------------------------------

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    max_depth=5
)


# --------------------------------------------------
# Train
# --------------------------------------------------

print("\nTraining model...")

model.fit(X_train, y_train)

print("Training completed!")


# --------------------------------------------------
# Prediction
# --------------------------------------------------

y_pred = model.predict(X_test)


# --------------------------------------------------
# Evaluation
# --------------------------------------------------

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\n========================================")
print("MODEL RESULTS")
print("========================================")

print("\nAccuracy:")
print(accuracy)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# --------------------------------------------------
# Feature importance
# --------------------------------------------------

importance = pd.DataFrame({
    "feature": features,
    "importance": model.feature_importances_
})

importance = importance.sort_values(
    "importance",
    ascending=False
)

print("\n========================================")
print("FEATURE IMPORTANCE")
print("========================================")

print(importance)


# --------------------------------------------------
# Save model
# --------------------------------------------------

joblib.dump(
    model,
    model_file
)

print("\n========================================")
print("MODEL SAVED")
print("========================================")

print(model_file)