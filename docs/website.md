# UI Notes

## React SPA (Primary UI)
- Lives in `web/site` and is built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui.
- Communicates with the FastAPI service via a configurable `VITE_API_BASE_URL` (defaults to `http://localhost:8000` for local dev).
- Provides an interactive dashboard for:
	- Uploading or selecting candidate observations.
	- Displaying prediction probabilities and model explanations (SHAP/feature importances roadmap).
	- Visualizing dataset trends (confirmation rate, stellar parameters) with responsive charts.
- Component primitives generated with shadcn-ui live under `src/components/ui`; shared layout/state helpers live in `src/lib`.
- Deployed automatically to Azure Static Web Apps through `.github/workflows/swa.yml` after each commit touching `web/site/**`.

### Local workflow
```pwsh
cd web/site
npm install
cp .env.example .env.local  # ensure VITE_API_BASE_URL is set
npm run dev
```
Visit <http://localhost:5173>. Update `VITE_API_BASE_URL` to point at a real API deployment when testing cloud environments.

### Production workflow
- Terraform provisions the SWA resource and outputs the deployment token.
- GitHub Actions build (`npm run build`) and upload the `dist/` folder on each commit.
- `infra/docker/Dockerfile.web` packages the same assets behind Nginx for container-based hosting.

## Legacy Prototypes
- Streamlit app (`src/exoplanet_ai/ui/app.py`) remains available for quick what-if experiments.
- Gradio interface (`web/ui/gradio_app.py`) serves as an alternative lightweight demo surface.
- Plotly Dash concept archived for potential mission control dashboards.

Learn more [ui](ui.md)