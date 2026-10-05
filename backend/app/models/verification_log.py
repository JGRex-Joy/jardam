from datetime import datetime
from sqlalchemy import JSON, DateTime, Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from ..core.database import Base


class VerificationLog(Base):
    __tablename__ = "verification_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    campaign_id: Mapped[int] = mapped_column(ForeignKey("campaigns.id"))
    score: Mapped[float] = mapped_column(Float)
    summary: Mapped[str] = mapped_column(Text)
    checks: Mapped[list] = mapped_column(JSON, default=list)
    red_flags: Mapped[list] = mapped_column(JSON, default=list)
    model: Mapped[str] = mapped_column(String(100), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
