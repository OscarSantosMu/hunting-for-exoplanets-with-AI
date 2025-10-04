from pathlib import Path

from exoplanet_ai.models.export import export_to_onnx

if __name__ == "__main__":
    model_path = Path("models") / "lightgbm.joblib"
    if not model_path.exists():
        raise SystemExit("Model artifact not found. Train a model first.")
    output_path = export_to_onnx(model_path)
    print(f"ONNX model saved to {output_path}")
