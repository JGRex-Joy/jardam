from abc import ABC, abstractmethod
from collections.abc import Sequence
from ..models import Campaign


class CampaignRepository(ABC):

    @abstractmethod
    async def count(self) -> int: ...

    @abstractmethod
    async def get(self, campaign_id: int) -> Campaign | None: ...

    @abstractmethod
    async def search(self, query: str = "") -> Sequence[Campaign]: ...

    @abstractmethod
    async def add(self, campaign: Campaign) -> Campaign: ...

    @abstractmethod
    async def save(self, campaign: Campaign) -> Campaign: ...
