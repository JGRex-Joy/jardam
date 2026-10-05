from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from ..core.config import Settings, get_settings
from ..core.database import get_db
from ..repositories.campaign_repository import CampaignRepository
from ..repositories.sqlalchemy_campaign_repository import SqlAlchemyCampaignRepository
from ..services.campaign_service import CampaignService
from ..services.document_verifier import DocumentVerifier
from ..services.groq_verifier import GroqVerifier
from ..services.mock_verifier import MockVerifier


def get_repository(db: AsyncSession = Depends(get_db)) -> CampaignRepository:
    return SqlAlchemyCampaignRepository(db)


def get_verifier(settings: Settings = Depends(get_settings)) -> DocumentVerifier:
    if settings.groq_api_key:
        return GroqVerifier(settings.groq_api_key, settings.groq_model)
    return MockVerifier()


def get_campaign_service(repo: CampaignRepository = Depends(get_repository),
                         verifier: DocumentVerifier = Depends(get_verifier),
                         settings: Settings = Depends(get_settings)) -> CampaignService:
    return CampaignService(repo, verifier, settings.verification_threshold)
