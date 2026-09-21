import json
import joblib
from pathlib import Path

import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ============================================================
# PATHS
# ============================================================

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
    .parent
)

FEATURE_FILE = (
    BASE_DIR
    / "data"
    / "processed"
    / "seattle_landslide_rainfall_features.json"
)


# ============================================================
# LOAD DATA
# ============================================================

print("=" * 60)
print("TRAINING SEATTLE LANDSLIDE BASELINE MODEL")
print("=" * 60)

with open(
    FEATURE_FILE,
    "r",
    encoding="utf-8"
) as file:

    data = json.load(file)


df = pd.DataFrame(data)


print()
print("Total samples:", len(df))


# ============================================================
# FEATURES
# ============================================================

feature_columns = [
    "rainfall_1d",
    "rainfall_3d",
    "rainfall_7d",
    "rainfall_15d",
    "rainfall_32d",
    "temperature_max",
    "temperature_min"
]


X = df[feature_columns]

y = df["landslide"]


print()
print("Features:")

for feature in feature_columns:
    print("-", feature)


print()
print("Target distribution:")
print(y.value_counts())


# ============================================================
# TRAIN / TEST SPLIT
# ============================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print()
print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))


# ============================================================
# RANDOM FOREST
# ============================================================

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42,
    class_weight="balanced"
)


print()
print("Training Random Forest...")

model.fit(
    X_train,
    y_train
)

# ============================================================
# SAVE MODEL
# ============================================================

MODEL_DIR = (
    BASE_DIR
    / "models"
    / "landslide"
)

MODEL_DIR.mkdir(
    parents=True,
    exist_ok=True
)

MODEL_FILE = (
    MODEL_DIR
    / "seattle_landslide_baseline.pkl"
)

joblib.dump(
    model,
    MODEL_FILE
)

print()
print("Model saved to:")
print(MODEL_FILE)

print("Training complete.")


# ============================================================
# PREDICTION
# ============================================================

y_pred = model.predict(X_test)


# ============================================================
# EVALUATION
# ============================================================

accuracy = accuracy_score(
    y_test,
    y_pred
)

print()
print("=" * 60)
print("MODEL EVALUATION")
print("=" * 60)

print()
print(
    "Accuracy:",
    round(accuracy, 4)
)

print()
print("Classification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        target_names=[
            "No Landslide",
            "Landslide"
        ]
    )
)

print()
print("Confusion Matrix:")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)


# ============================================================
# FEATURE IMPORTANCE
# ============================================================

print()
print("Feature Importance:")

importance = model.feature_importances_

feature_importance = sorted(
    zip(
        feature_columns,
        importance
    ),
    key=lambda x: x[1],
    reverse=True
)

for feature, value in feature_importance:

    print(
        f"{feature}: {value:.4f}"
    )


print()
print("=" * 60)
print("BASELINE MODEL TRAINING COMPLETE")
print("=" * 60)