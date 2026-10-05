from pydantic import BaseModel, Field
from ..models.enums import CampaignStatus, Category
from .base import ORMModel
from .document import DocumentOut
from .verification import VerificationOut


class CampaignOut(ORMModel):
    id: int
    title_ru: str
    title_kg: str
    summary_ru: str
    summary_kg: str
    story_ru: str
    story_kg: str
    category: Category
    cover_url: str
    beneficiary: str
    payment: str
    target: int
    raised: int
    donors: int
    days_left: int
    status: CampaignStatus
    budget: list[dict] = []
    expenses: list[dict] = []
    documents: list[DocumentOut] = []
    ai_report: VerificationOut | None = None


class DonationIn(BaseModel):
    amount: int = Field(gt=0)
