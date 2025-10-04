from fastapi import APIRouter, Depends, HTTPException
import pandas as pd

from exoplanet_ai.inference.schema import PredictPayload
from web.api.deps import load_model


router = APIRouter(prefix="/predict", tags=["predict"])


@router.post("/")
def predict(payload: PredictPayload, model_bundle=Depends(load_model)):
    df = pd.DataFrame([payload.features])
    try:
        prediction = model_bundle["model"].predict(df)[0]
    except Exception as exc:  # pragma: no cover
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    response = {"prediction": prediction}
    if hasattr(model_bundle["model"], "predict_proba"):
        response["probabilities"] = model_bundle["model"].predict_proba(df)[0].tolist()
    return response
