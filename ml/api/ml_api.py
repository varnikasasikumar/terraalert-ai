from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path


# ==================================================
# FastAPI application
# ==================================================

app = FastAPI(
    title="TerraAlert AI ML Service",
    description="Flood prediction service using Random Forest",
    version="1.0"
)


# ==================================================
# Load trained model
# ==================================================

MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "models"
    / "flood_random_forest.pkl"
)

model = joblib.load(MODEL_PATH)


# ==================================================
# Request model
# ==================================================

class FloodPredictionRequest(BaseModel):

    # Radar features
    reflectivityMean: float
    reflectivityMax: float
    reflectivityMin: float
    reflectivityStd: float
    reflectivityMedian: float

    reflectivityGe20Pct: float
    reflectivityGe30Pct: float
    reflectivityGe40Pct: float

    radarObservationCount: int

    # Weather features
    temperature: float
    humidity: float
    rainfall: float
    pressure: float
    windSpeed: float
    soilMoisture: float


# ==================================================
# Health check
# ==================================================

@app.get("/")
def root():

    return {
        "service": "TerraAlert AI ML Service",
        "status": "running"
    }


# ==================================================
# Flood prediction endpoint
# ==================================================

@app.post("/api/predict/flood")
def predict_flood(
    request: FloodPredictionRequest
):

    # Convert request into DataFrame

    input_data = pd.DataFrame([{
        "reflectivity_mean":
            request.reflectivityMean,

        "reflectivity_max":
            request.reflectivityMax,

        "reflectivity_min":
            request.reflectivityMin,

        "reflectivity_std":
            request.reflectivityStd,

        "reflectivity_median":
            request.reflectivityMedian,

        "reflectivity_ge_20_pct":
            request.reflectivityGe20Pct,

        "reflectivity_ge_30_pct":
            request.reflectivityGe30Pct,

        "reflectivity_ge_40_pct":
            request.reflectivityGe40Pct,

        "radar_observation_count":
            request.radarObservationCount,

        "temperature_2m":
            request.temperature,

        "relative_humidity_2m":
            request.humidity,

        "precipitation":
            request.rainfall,

        "surface_pressure":
            request.pressure,

        "wind_speed_10m":
            request.windSpeed,

        "soil_moisture_0_to_7cm":
            request.soilMoisture
    }])


    # --------------------------------------------------
    # Prediction
    # --------------------------------------------------

    prediction = model.predict(
        input_data
    )[0]


    probabilities = model.predict_proba(
        input_data
    )[0]


    flood_probability = float(
        probabilities[1]
    )

    normal_probability = float(
        probabilities[0]
    )


    # --------------------------------------------------
    # Result
    # --------------------------------------------------

    if prediction == 1:

        prediction_label = "FLOOD_RISK"

    else:

        prediction_label = "NORMAL"


    return {

        "prediction": prediction_label,

        "floodProbability":
            flood_probability,

        "normalProbability":
            normal_probability
    }