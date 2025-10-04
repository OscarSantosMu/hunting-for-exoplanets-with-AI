from pathlib import Path

import pandas as pd

from exoplanet_ai.inference.predict import batch_predict


if __name__ == "__main__":
    model_path = Path("models") / "lightgbm.joblib"
    data_path = Path("data") / "processed" / "inference_sample.csv"
    if not data_path.exists():
        raise SystemExit(
            "Provide a processed data file at data/processed/inference_sample.csv"
        )
    df = pd.read_csv(data_path)
    result = batch_predict(model_path, df)
    out = Path("artifacts") / "batch_predictions.csv"
    out.parent.mkdir(parents=True, exist_ok=True)
    result.to_csv(out, index=False)
    print(f"Wrote predictions to {out}")
