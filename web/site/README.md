# Exoplanet Frontend (Vite + React)

This directory contains the production web experience for the project. It is a Vite-powered React/TypeScript application styled with Tailwind CSS and shadcn-ui components. The frontend consumes the FastAPI service for inference and is deployed to Azure Static Web Apps via GitHub Actions.

## Prerequisites

- Node.js 20.x (use `nvm use 20` or install from <https://nodejs.org/en/download>).
- npm 10.x (ships with Node 20).

## Local Development

```pwsh
cd web/site
npm install
cp .env.example .env.local  # optional helper if present
# or create the file manually (see below)

```

Then visit <http://localhost:5173> (or whatever port Vite reports) in your browser.

### API configuration

The frontend expects to find the FastAPI base URL in `VITE_API_BASE_URL`:

```env
# .env.local
VITE_API_BASE_URL=http://localhost:8000
```

Vite automatically injects this variable at build time. Restart the dev server after editing `.env.local`.

## Available Scripts

| Command            | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `npm run dev`      | Start Vite in development mode with fast HMR       |
| `npm run build`    | Produce an optimized production bundle in `dist/`  |
| `npm run preview`  | Preview the production build locally               |
| `npm run lint`     | Run ESLint across the project                      |

## Project Structure

```
src/
	components/      reusable UI blocks (shadcn-ui + custom)
	components/ui/   generated shadcn-ui primitives
	lib/             utilities (API client, hooks, helpers)
	pages/           top-level routed views
	main.tsx         React root
	index.css        Tailwind layer definitions
```

## Deployment

- Terraform (`infra/terraform`) provisions the Azure Static Web App resource and outputs the deployment token.
- `.github/workflows/swa.yml` builds the site and uploads the `dist/` bundle on every push/PR touching `web/site/**`.
- Store the Terraform output `static_web_app_api_key` as the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to enable the workflow.

To build locally for manual testing or Docker image creation:

```pwsh
npm run build
```

The resulting assets live in `dist/` and are served by the Nginx container defined in `infra/docker/Dockerfile.web`.

## Legacy UIs

The Streamlit (`src/exoplanet_ai/ui/app.py`) and Gradio (`web/ui/gradio_app.py`) apps remain for quick experimentation, but the React SPA is the primary user-facing experience.
To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
