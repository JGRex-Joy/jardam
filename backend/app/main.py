from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .core.config import get_settings
from .core.database import Base, Session, engine
from .core.exceptions import CampaignNotFound
from .repositories.sqlalchemy_campaign_repository import SqlAlchemyCampaignRepository
from .routers import campaigns
from .seed import seed


@asynccontextmanager
async def lifespan(_: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with Session() as session:
        await seed(SqlAlchemyCampaignRepository(session))
    yield


def create_app() -> FastAPI:
    app = FastAPI(title="Jardam API", lifespan=lifespan)
    app.add_middleware(CORSMiddleware, allow_origins=list(get_settings().cors_origins),
                       allow_methods=["*"], allow_headers=["*"])
    app.include_router(campaigns.router)

    @app.exception_handler(CampaignNotFound)
    async def not_found(_: Request, exc: CampaignNotFound):
        return JSONResponse(status_code=404, content={"detail": str(exc)})

    @app.get("/api/health")
    async def health():
        return {"ok": True}

    return app


app = create_app()
