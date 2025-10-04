# Data Directory

This project does **not** commit large NASA datasets. Use the fetch scripts to download locally.

Structure:
- `external/` – raw files exactly as obtained from NASA portals (CSV, FITS).
- `raw/` – lightweight samples pulled automatically for quick iteration.
- `interim/` – cleaned/intermediate tables.
- `processed/` – model-ready feature matrices (parquet/npz).

Each subdirectory should contain a `README.md` or metadata file documenting provenance and schema.
