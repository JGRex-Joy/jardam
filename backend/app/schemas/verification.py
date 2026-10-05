from .base import ORMModel


class VerificationOut(ORMModel):
    score: float
    summary: str
    checks: list[str] = []
    red_flags: list[str] = []
    model: str = ""
