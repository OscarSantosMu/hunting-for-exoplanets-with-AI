from fastapi import FastAPI

from exoplanet_ai.api.app import app as core_app
from web.api.routers.predict import router as predict_router


def create_app() -> FastAPI:
    api = FastAPI(title="Exoplanet AI Service", version="0.1.0")
    api.mount("", core_app)
    api.include_router(predict_router)
    return api


app = create_app()
