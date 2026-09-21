from flask import Flask, request, jsonify
import joblib
import pandas as pd
from pathlib import Path


app = Flask(__name__)


# ============================================================
# LOAD MODEL
# ============================================================

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
)

MODEL_FILE = (
    BASE_DIR
    / "models"
    / "landslide"
    / "seattle_landslide_baseline.pkl"
)


model = joblib.load(MODEL_FILE)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return jsonify({
        "status": "UP",
        "service": "landslide-ml-service"
    })


# ============================================================
# LANDSLIDE PREDICTION
# ============================================================

@app.post("/predict")
def predict_landslide():

    data = request.get_json()

    required_features = [
        "rainfall_1d",
        "rainfall_3d",
        "rainfall_7d",
        "rainfall_15d",
        "rainfall_32d",
        "temperature_max",
        "temperature_min"
    ]


    # Check required fields

    missing = [
        feature
        for feature in required_features
        if feature not in data
    ]


    if missing:

        return jsonify({
            "error": "Missing required features",
            "missing": missing
        }), 400


    # Create DataFrame

    sample = pd.DataFrame([{
        feature: float(data[feature])
        for feature in required_features
    }])


    # Prediction

    prediction = int(
        model.predict(sample)[0]
    )


    probability = float(
        model.predict_proba(sample)[0][1]
    )


    # Risk level

    if probability >= 0.75:

        risk = "HIGH"

    elif probability >= 0.40:

        risk = "MEDIUM"

    else:

        risk = "LOW"


    return jsonify({

        "prediction": prediction,

        "landslideProbability": round(
            probability,
            4
        ),

        "risk": risk

    })


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":

    print("=" * 60)
    print("LANDSLIDE ML SERVICE")
    print("=" * 60)

    print(
        "Model:",
        MODEL_FILE
    )

    print(
        "Starting server on port 5001..."
    )

    app.run(
        host="0.0.0.0",
        port=5001,
        debug=False
    )