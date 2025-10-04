<div align="center">

# 🔭 Exoplanet AI: Hunting for Exoplanets with AI

AI/ML pipeline & web interface for the 2025 NASA Space Apps Challenge – automated exoplanet classification from Kepler / K2 / TESS open datasets.

</div>

## Overview
Thousands of exoplanets have been discovered via space-based survey missions. Much of the classification work has historically been manual. This repository provides a reproducible scaffold to:

* Ingest (sample) public NASA Exoplanet Archive data
* Train baseline ML models (Random Forest, optional LightGBM / XGBoost)
* Serve predictions via a FastAPI service
* Offer an interactive Streamlit UI for manual feature input & experimentation
* Prepare space for advanced preprocessing, feature engineering, model selection & evaluation

## High-Level Architecture
```
configs/                # data/model/train/evaluate/web knobs
data/                   # raw/interim/processed storage (lightweight samples)
docs/                   # deep-dive documentation (overview, datasets, api, ui)
experiments/            # run snapshots, metrics
infra/                  # docker, terraform (AML), AML templates, k8s skeleton
models/                 # versioned model bundles (tracked metadata)
notebooks/              # exploratory analyses (00-04)
scripts/                # CLI entrypoints (fetch/train/evaluate/batch)
src/exoplanet_ai/
	api/                  # FastAPI app
	data/                 # download/load utilities
	features/             # feature engineering helpers
	preprocessing/        # sklearn pipelines
	models/               # registry + training abstractions
	training/             # orchestration & callbacks
	inference/            # batch predict + schemas
	evaluation/           # metrics, reporting, thresholds
	ui/                   # Streamlit app
	viz/                  # Plotly charts
	utils/                # logging, path helpers
tests/                  # pytest suites (data, features, api, cli)
web/                    # deployment entrypoints (API mount, Streamlit/Gradio)
```

## Quick Start

### 1. Environment
Requires Python 3.10+.

```pwsh
python -m venv .venv
./.venv/Scripts/Activate.ps1
pip install -U pip
pip install -e .[dev]
```

### 2. Fetch Sample Data
```pwsh
python scripts/fetch_data.py
```
This pulls a small subset (top 500 rows) of the NASA Exoplanet Archive composite parameters table (for hackathon iteration speed).

### 3. Train Baseline
```pwsh
python scripts/train_model.py
```
Logs a simple classification report and saves the model in `models/`.

### 4. Run API
```pwsh
python scripts/run_api.py
```
Visit: http://localhost:8000/docs for interactive Swagger UI.

### 5. Streamlit UI
```pwsh
streamlit run src/exoplanet_ai/ui/app.py
```

### Optional: Gradio UI
```pwsh
python web/ui/gradio_app.py
```

### Optional: Lightkurve Sample
```pwsh
python -c "from exoplanet_ai.data.lightcurve import download_lightcurve; download_lightcurve('Kepler-10')"
```

### Optional: Export ONNX
```pwsh
make onnx
```

### Deploy: Terraform + Azure Machine Learning
```pwsh
cd infra/terraform
terraform init
terraform plan -var="project_name=exo-ai" -var="acr_name=exoacr" -var="storage_account_name=<unique storage>"
terraform apply
```
Use the outputs (workspace name, Key Vault URI, ACR credentials) together with the Azure ML CLI to register models and manage endpoints:
```pwsh
# train a model first, then
az login
az extension add -n ml
az ml model create --name exoplanet-ai --version 1 --type custom --path models/random_forest.joblib
az ml environment create --file infra/aml/environment.yaml
az ml online-endpoint create --file infra/aml/endpoint.yaml
az ml online-deployment create --file infra/aml/deployment.yaml --all-traffic
```
Remote state lives in the Azure Storage account (`tfstate` container). If this is your first run, create the container once with `az storage container create --name tfstate --account-name <your-storage-account> --auth-mode login` before re-running `terraform init -backend-config=backend.hcl -reconfigure`.
See `docs/azure.md` for end-to-end AML guidance and YAML templates.

### Optional: Container Apps Fallback
If you prefer a lightweight container deployment, adapt the previous Container Apps instructions (now archived in repo history) or create a new Terraform stack dedicated to ACA.

## CLI Shortcuts
After installation the following entry points are available:
```pwsh
exo-fetch
exo-train
exo-api
exo-eval
```

## Configuration
Default config: `src/exoplanet_ai/config/default.yaml`
Experiment variants: `configs/experiment_*.yaml`

You can extend these to add richer preprocessing, balancing strategies, feature selection, or advanced models.

## Roadmap Ideas
* Proper schema & target label harmonization (Confirmed / Candidate / False Positive)
* Feature engineering (stellar vs planetary separation, SNR metrics)
* Class imbalance handling (SMOTE, focal loss models)
* Model comparison & leaderboard (tracked in `artifacts/`)
* Incremental / online learning from user uploads
* Bayesian hyperparameter optimization (Optuna)
* Model interpretability (SHAP, permutation importance)
* Time-series light curve ingestion pipeline (if adding raw flux CSV/FITS ingestion)
* Automated Docker/K8s deployment pipelines (`infra/` + GitHub Actions)
* Terraform-driven Azure deployment pipelines with secrets management

## Tech Stack Snapshot
- **Backend**: FastAPI, ONNX Runtime-ready exports, scikit-learn baselines, optional LightGBM/XGBoost.
- **Frontend**: Streamlit, Gradio, Plotly visualizations.
- **Data**: Lightkurve integration for light curves, pandas/pyarrow for tabular data.
- **Ops**: Docker, Terraform (Azure Machine Learning workspace), GitHub Actions, optional K8s manifests.
- **MLOps**: Azure Machine Learning model registry, environments, and online endpoints (Container Apps available as a fallback).

## CI/CD
- `ci.yml` runs lint/tests, builds Docker images, exports ONNX artifacts, and generates Terraform plans on pushes & PRs.
- Terraform apply (via `deploy_infra.yml`) provisions the AML workspace, storage, Key Vault, and supporting resources when triggered manually.
- Configure Azure OIDC credentials in repository secrets (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`).
- Extend the workflows with Azure ML CLI steps (`az ml model create`, `az ml online-deployment update`) to automate model promotion—templates live in `docs/azure.md`.

## Testing
```pwsh
pytest -q
```

## Contributing
See `CONTRIBUTING.md` for style, workflow, and guidelines.

## Citation
If you use or extend this scaffold, please cite using `CITATION.cff`.

## License
MIT © 2025 Sharknados

## Disclaimer
This scaffold fetches only a lightweight subset of the full archive for rapid iteration. Replace the download logic with full TAP queries & light-curve processing for production-grade research.

