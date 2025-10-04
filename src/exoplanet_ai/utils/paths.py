from __future__ import annotations

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]  # .../hunting-for-exoplanets-with-AI
SRC_ROOT = PROJECT_ROOT / "src"
DATA_ROOT = PROJECT_ROOT / "data"
RAW_DATA = DATA_ROOT / "raw"
INTERIM_DATA = DATA_ROOT / "interim"
PROCESSED_DATA = DATA_ROOT / "processed"
EXTERNAL_DATA = DATA_ROOT / "external"
MODELS_DIR = PROJECT_ROOT / "models"
ARTIFACTS_DIR = PROJECT_ROOT / "artifacts"
LOGS_DIR = PROJECT_ROOT / "logs"
CONFIG_DIR = PROJECT_ROOT / "configs"

for d in [
    RAW_DATA,
    INTERIM_DATA,
    PROCESSED_DATA,
    EXTERNAL_DATA,
    MODELS_DIR,
    ARTIFACTS_DIR,
    LOGS_DIR,
]:
    d.mkdir(parents=True, exist_ok=True)

__all__ = [
    "PROJECT_ROOT",
    "SRC_ROOT",
    "DATA_ROOT",
    "RAW_DATA",
    "INTERIM_DATA",
    "PROCESSED_DATA",
    "EXTERNAL_DATA",
    "MODELS_DIR",
    "ARTIFACTS_DIR",
    "LOGS_DIR",
    "CONFIG_DIR",
]
