# API Contract

Base URL defaults to `http://localhost:8000` when running locally.

## Routes
- `GET /health` → `{ "status": "ok" }`
- `POST /predict` → request body containing feature dictionary and optional model name.
- Planned: `GET /version`, `POST /explain`, `POST /batch`.

## Request Example
```json
{
  "model_name": "lightgbm",
  "features": {
    "pl_orbper": 5.86,
    "pl_rade": 1.24,
    "st_teff": 5500
  }
}
```
