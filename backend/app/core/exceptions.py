class DomainError(Exception):
    pass


class CampaignNotFound(DomainError):
    def __init__(self, campaign_id: int):
        super().__init__(f"Campaign {campaign_id} not found")
