from pathlib import Path

import joblib

from exoplanet_ai.utils.paths import MODELS_DIR


def load_model(model_name: str = "model_test_lgbm"):
    model_path = MODELS_DIR / f"latest/{model_name}.joblib"
    if not model_path.exists():
        raise FileNotFoundError(f"Model {model_name} not found. Train it first.")
    return joblib.load(model_path)
