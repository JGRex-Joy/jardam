import os
from dataclasses import dataclass
from functools import lru_cache

DEFAULT_DB = "sqlite+aiosqlite:///./jardam.db"
DEFAULT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct"


def _async_db_url(url: str) -> str:
    for prefix in ("postgres://", "postgresql://"):
        if url.startswith(prefix):
            return "postgresql+asyncpg://" + url[len(prefix):]
    return url


@dataclass(frozen=True)
class Settings:
    database_url: str
    groq_api_key: str
    groq_model: str
    cors_origins: tuple[str, ...]
    verification_threshold: float = 0.85


@lru_cache
def get_settings() -> Settings:
    origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
    return Settings(
        database_url=_async_db_url(os.getenv("DATABASE_URL", DEFAULT_DB)),
        groq_api_key=os.getenv("GROQ_API_KEY", ""),
        groq_model=DEFAULT_MODEL,
        cors_origins=tuple(o.strip() for o in origins),
    )
