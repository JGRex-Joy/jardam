from dataclasses import dataclass


@dataclass(frozen=True)
class CreateCampaignCommand:
    title: str
    category: str
    description: str
    target: int
    beneficiary: str
    payment: str = ""
