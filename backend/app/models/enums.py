from enum import Enum


class CampaignStatus(str, Enum):
    VERIFIED = "VERIFIED"
    PENDING_HUMAN_REVIEW = "PENDING_HUMAN_REVIEW"


class Category(str, Enum):
    MEDICAL = "medical"
    EMERGENCY = "emergency"
    NGO = "ngo"
    SOCIAL = "social"
