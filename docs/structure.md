# Project Structure Rationale

This repository merges the originally scaffolded layout with enhancements inspired by the provided reference structure.

## Key Alignments
- Added `.gitattributes`, `.pre-commit-config.yaml`, and `requirements.txt` for reproducibility and linting consistency.
- Expanded `configs/` into dedicated YAMLs (`data`, `model`, `train`, `evaluate`, `web`).
- Enriched documentation under `docs/` mirroring reference topics (overview, datasets, modeling, API, UI, structure rationale).
- Introduced `experiments/` with guidance for run tracking.
- Brought in `features/`, `training/`, `inference/`, and `viz/` subpackages for clear separation of concerns.
- Added `data/lightcurve.py` leveraging Lightkurve, and `models/export.py` enabling ONNX exports.
- Added `web/` deployment entrypoints (API mount, Streamlit/Gradio wrappers, assets).
- Created `infra/` with Dockerfiles, compose file, k8s placeholder, and Terraform Azure module.
- Established GitHub Actions workflows mirroring reference CI/CD suggestions.

## Intentional Simplifications
- Kept dataset download logic lightweight (subset pulls) for hackathon iteration speed; replace with full TAP queries as needed.
- Dockerfiles use python slim images; consider scanning/patching for vulnerabilities before production.
- Placeholders (e.g., notebooks, experiment stubs) highlight expected artifacts without heavy storage requirements.

## Next Steps
- Wire configs into runtime loaders (Hydra/OmegaConf or custom loader).
- Expand notebooks with actual exploratory code and plots.
- Integrate MLflow or lightweight JSON trackers into `experiments/runs/` automatically.
- Harden Docker images and add security scanning to CI.
