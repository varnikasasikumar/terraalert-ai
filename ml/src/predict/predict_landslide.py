import joblib
import pandas as pd
from pathlib import Path


BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
    .parent
)


MODEL_FILE = (
    BASE_DIR
    / "models"
    / "landslide"
    / "seattle_landslide_baseline.pkl"
)


print("=" * 60)
print("TESTING SAVED LANDSLIDE MODEL")
print("=" * 60)


# Load model

model = joblib.load(
    MODEL_FILE
)


print()
print("Model loaded successfully.")


# Example weather conditions

sample = pd.DataFrame([
    {
        "rainfall_1d": 21.1,
        "rainfall_3d": 91.9,
        "rainfall_7d": 109.7,
        "rainfall_15d": 110.3,
        "rainfall_32d": 268.1,
        "temperature_max": 10.0,
        "temperature_min": 5.0
    }
])


# Prediction

prediction = model.predict(
    sample
)[0]


probability = model.predict_proba(
    sample
)[0][1]


print()
print("Prediction:", prediction)

print(
    "Landslide probability:",
    round(probability, 4)
)


if prediction == 1:

    print(
        "Risk: LANDSLIDE CONDITIONS DETECTED"
    )

else:

    print(
        "Risk: NO LANDSLIDE CONDITIONS DETECTED"
    )


print()
print("=" * 60)
print("PREDICTION TEST COMPLETE")
print("=" * 60)