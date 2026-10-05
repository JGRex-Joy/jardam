from collections.abc import Sequence
from ..core.exceptions import CampaignNotFound
from ..models import Campaign, CampaignStatus, Document, VerificationLog
from ..repositories.campaign_repository import CampaignRepository
from .commands import CreateCampaignCommand
from .document_verifier import DocumentVerifier
from .uploaded_file import UploadedFile
from .verification_result import VerificationResult

SUMMARY_MAX_LENGTH = 160
DEFAULT_DURATION_DAYS = 30


class CampaignService:
    def __init__(self, repository: CampaignRepository, verifier: DocumentVerifier, trust_threshold: float):
        self._repo, self._verifier, self._threshold = repository, verifier, trust_threshold

    async def search(self, query: str) -> Sequence[Campaign]:
        return await self._repo.search(query)

    async def get(self, campaign_id: int) -> Campaign:
        campaign = await self._repo.get(campaign_id)
        if campaign is None:
            raise CampaignNotFound(campaign_id)
        return campaign

    async def donate(self, campaign_id: int, amount: int) -> Campaign:
        campaign = await self.get(campaign_id)
        campaign.receive_donation(amount)
        return await self._repo.save(campaign)

    async def create(self, cmd: CreateCampaignCommand, cover: UploadedFile, documents: Sequence[UploadedFile]) -> Campaign:
        result = await self._verify(cmd, documents)
        status = CampaignStatus.VERIFIED if result.is_trusted(self._threshold) else CampaignStatus.PENDING_HUMAN_REVIEW
        return await self._repo.add(self._build(cmd, cover, documents, result, status))

    async def _verify(self, cmd: CreateCampaignCommand, documents: Sequence[UploadedFile]) -> VerificationResult:
        if not documents:
            return VerificationResult.rejected("No documents provided.", "no_documents")
        return await self._verifier.verify(cmd.title, cmd.beneficiary, documents)

    @staticmethod
    def _build(cmd, cover, documents, result, status) -> Campaign:
        summary = cmd.description[:SUMMARY_MAX_LENGTH]
        return Campaign(
            title_ru=cmd.title, title_kg=cmd.title, summary_ru=summary, summary_kg=summary,
            story_ru=cmd.description, story_kg=cmd.description, category=cmd.category, cover_url=cover.data_url,
            beneficiary=cmd.beneficiary, payment=cmd.payment, target=cmd.target, days_left=DEFAULT_DURATION_DAYS,
            status=status.value,
            documents=[Document(name=d.name, url=d.data_url) for d in documents],
            logs=[VerificationLog(score=result.confidence, summary=result.summary, checks=list(result.checks),
                                  red_flags=list(result.red_flags), model=result.model)])
