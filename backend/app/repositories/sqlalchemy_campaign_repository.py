from collections.abc import Sequence
from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from ..models import Campaign
from .campaign_repository import CampaignRepository


class SqlAlchemyCampaignRepository(CampaignRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def count(self) -> int:
        return await self._session.scalar(select(func.count(Campaign.id)))

    async def get(self, campaign_id: int) -> Campaign | None:
        return await self._session.get(Campaign, campaign_id)

    async def search(self, query: str = "") -> Sequence[Campaign]:
        stmt = select(Campaign).order_by(Campaign.id.desc())
        if query:
            like = f"%{query}%"
            stmt = stmt.where(or_(Campaign.title_ru.ilike(like), Campaign.title_kg.ilike(like),
                                  Campaign.beneficiary.ilike(like)))
        return (await self._session.scalars(stmt)).all()

    async def add(self, campaign: Campaign) -> Campaign:
        self._session.add(campaign)
        return await self.save(campaign)

    async def save(self, campaign: Campaign) -> Campaign:
        await self._session.commit()
        return campaign
