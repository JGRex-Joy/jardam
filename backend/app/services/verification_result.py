from dataclasses import dataclass


@dataclass(frozen=True)
class VerificationResult:
    is_valid: bool
    confidence: float
    summary: str
    checks: tuple[str, ...] = ()
    red_flags: tuple[str, ...] = ()
    model: str = ""

    def is_trusted(self, threshold: float) -> bool:
        return self.is_valid and self.confidence >= threshold

    @classmethod
    def uncertain(cls, summary: str, red_flags: tuple[str, ...] = (), model: str = "") -> "VerificationResult":
        return cls(False, 0.5, summary, (), red_flags, model)

    @classmethod
    def rejected(cls, summary: str, red_flag: str) -> "VerificationResult":
        return cls(False, 0.0, summary, (), (red_flag,))

    @classmethod
    def from_payload(cls, data: dict, model: str) -> "VerificationResult":
        confidence = max(0.0, min(1.0, float(data.get("confidence_score", 0))))
        return cls(bool(data.get("is_valid")), confidence, str(data.get("summary", "")),
                   tuple(data.get("checks", ())), tuple(data.get("red_flags", ())), model)
