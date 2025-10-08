<div align="center">

# 🔭 Exoplanet AI: Hunting for Exoplanets with AI

AI/ML pipeline & web interface for the 2025 NASA Space Apps Challenge – automated exoplanet classification from Kepler / K2 / TESS open datasets.

</div>

> This project was developed for NASA Space Apps Challenge 2025 in Mexico City. There is a separate [README](EXEC-README.md) regarding the problem, proposal, and info about the contest in general.

## Overview
Thousands of exoplanets have been discovered via space-based survey missions. Much of the classification work has historically been manual. This repository provides a reproducible scaffold to:

* Ingest (sample) public NASA Exoplanet Archive data
* Train baseline ML models (optional LightGBM / CatBoost, Ensamble) and a DL Ensamble, a replica of [ExoMiner](https://arxiv.org/pdf/2111.10009)
* Serve predictions via a FastAPI service
* Offer a modern React SPA (Vite + Tailwind + shadcn-ui) for exploration, with legacy Streamlit/Gradio prototypes for rapid experimentation
* Prepare space for advanced preprocessing, feature engineering, model selection & evaluation

## Demo
[![Demo video screenshot](assets/web%20page.png)](https://youtu.be/WUcHRQ6usZc)

## Data flow architecture

<img src="data/Diagrama%20de%20Flujo%20-%20Datos.png" alt="Data Flow" height="500">

*This modular pipeline ingests exoplanet data, preprocesses and engineers features, trains and evaluates ML models, and serves predictions via a FastAPI backend. The architecture supports both a React SPA and legacy UIs, with infrastructure managed by Docker and Terraform for scalable Azure deployment.  
Repository organization enables easy extension for advanced ML and cloud automation.*

## High-Level Architecture
<a href="https://www.youtube.com/watch?v=YOUR_ID"
   target="_blank" rel="noopener">
  <img src="assets/Infra.png" alt="High-Level Architecture" />
</a>


## Tech Stack Snapshot
- **Backend**: FastAPI, scikit-learn baselines, LightGBM/XGBoost/CatBoost/Neural Network.
- **Frontend**: React + Vite + Tailwind + shadcn-ui SPA (primary).
- **Data**: Lightkurve integration for light curves, pandas/pyarrow for tabular data.
- **Ops**: Docker, Terraform (Azure Machine Learning workspace), GitHub Actions.
- **MLOps**: Azure Machine Learning model registry, environments, and online endpoints (Container Apps available as a fallback).

## High-Level Project
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
	ui/                   # Streamlit app (legacy prototype)
	viz/                  # Plotly charts
	utils/                # logging, path helpers
tests/                  # pytest suites (data, features, api, cli)
web/                    # FastAPI mount, React SPA (web/site), legacy demos
```

## Quick Start

### 1. Environment
Requires Python 3.10+.

```pwsh
python -m venv .venv
.venv/Scripts/activate
pip install -U pip
# Full toolchain (training + API + dev tooling)
pip install -e .[train,api,dev]
```

> Need a lighter install? Use `pip install -e .[api]` for the FastAPI service or `pip install -e .[train]` for experimentation jobs.

### 2. Run APIs
Clone our other repositories, read more [here](src/exoplanet_ai/README.md).
Then visit: http://localhost:8000/docs and http://localhost:8001/docs for interactive Swagger UI.

### 3. React Web App
```pwsh
cd web/site
npm install
cp .env.example .env.local  # ensure VITE_API_BASE_URL and VITE_API_BASE_URL2 are set
npm run dev
```
The dev server runs at <http://localhost:5173>. Point `VITE_API_BASE_URL` to the FastAPI service (default `http://localhost:8000`) and `VITE_API_BASE_URL2` to the Blob Storage service (default `http://localhost:8001`)

### Deploy: Terraform + Azure Machine Learning + Static Web App

We have build terraform github workflows that you can manually trigger from the Actions section, for deploying and destroying the infrastructure.

- Terraform apply (via `deploy_infra.yml`) provisions the AML workspace, storage, Key Vault, Static Web App, and supporting resources when triggered manually.
- `swa.yml` to deploy constantly the Azure Static Web App on each commit to main and to deploy a preview environment on pull request to main. It builds the React SPA and publishes it to Azure Static Web Apps on every push/PR touching `web/site/**` (requires `AZURE_STATIC_WEB_APPS_API_TOKEN`).
- Configure Azure OIDC credentials in repository secrets (`AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`).
- Extend the workflows with Azure ML CLI steps (`az ml model create`, `az ml online-deployment update`) to automate model promotion—templates live in `docs/azure.md`.

Remote state lives in the Azure Storage account (`tfstate` container). If this is your first run, create the container once with `az storage container create --name tfstate --account-name <your-storage-account> --auth-mode login` or create it manually in Azure Portal.

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

## Contributing
See `CONTRIBUTING.md` for style, workflow, and guidelines.

## License
MIT © 2025 Sharknados

## Disclaimer
This scaffold fetches only a lightweight subset of the full archive for rapid iteration.
