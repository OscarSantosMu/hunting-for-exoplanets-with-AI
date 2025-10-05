from __future__ import annotations

from pathlib import Path
from typing import Any, Dict
import joblib
from functools import lru_cache
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd

from ..utils.logging import get_logger
from ..utils.paths import MODELS_DIR

logger = get_logger(__name__)

app = FastAPI(title="Exoplanet AI API", version="0.1.0")


class PredictRequest(BaseModel):
    features: Dict[str, float]
    model_name: str = "model_test_lgbm"


@app.get("/health")
def health():  # pragma: no cover simple
    return {"status": "ok"}


def _unwrap_model(bundle: Any):
    # Accept dict bundle or raw estimator/pipeline
    if isinstance(bundle, dict):
        return bundle.get("model", bundle)
    return bundle


def _get_feature_names(model, bundle):
    # Try LightGBM/SKLearn attributes or bundle metadata
    names = getattr(model, "feature_name_", None)
    if names is None and isinstance(bundle, dict):
        names = bundle.get("feature_names") or bundle.get("features")
    return list(names) if names is not None else None


@lru_cache(maxsize=8)
def _load_model(path: str):
    bundle = joblib.load(path)
    model = _unwrap_model(bundle)
    feats = _get_feature_names(model, bundle=bundle)
    return model, feats


@app.post("/predict")
def predict(req: PredictRequest):
    model_path = MODELS_DIR / "latest" / f"{req.model_name}.joblib"
    logger.info(f"Model path: {model_path}")
    if not model_path.exists():
        raise HTTPException(status_code=404, detail="Model not found. Train first.")

    try:
        model, feature_names = _load_model(str(model_path))
    except Exception as e:
        logger.exception("Failed to load model")
        raise HTTPException(status_code=500, detail=f"Model load error: {e}")

    # Build a one-row DataFrame from incoming features
    df = pd.DataFrame([req.features])

    # If we know the model’s expected feature order, enforce it (fill missing with 0/NA)
    if feature_names:
        # Keep only expected columns, add missing ones as 0, order them
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0
        df = df[feature_names]

    try:
        pred = model.predict(df)[0]
        proba = None
        if hasattr(model, "predict_proba"):
            # Some regressors also expose predict_proba incorrectly; guard shape
            p = model.predict_proba(df)
            # Convert to plain Python floats
            proba = [float(x) for x in p[0]]
    except Exception as e:
        logger.exception("Prediction failed")
        raise HTTPException(status_code=400, detail=str(e))

    return {
        "prediction": str(pred),
        "proba": proba,  # list of floats or None if not available
    }


__all__ = ["app"]
