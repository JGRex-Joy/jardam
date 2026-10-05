from sqlalchemy import JSON, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.database import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id: Mapped[int] = mapped_column(primary_key=True)
    title_ru: Mapped[str] = mapped_column(String(300))
    title_kg: Mapped[str] = mapped_column(String(300))
    summary_ru: Mapped[str] = mapped_column(Text)
    summary_kg: Mapped[str] = mapped_column(Text)
    story_ru: Mapped[str] = mapped_column(Text)
    story_kg: Mapped[str] = mapped_column(Text)
    category: Mapped[str] = mapped_column(String(30))
    cover_url: Mapped[str] = mapped_column(Text)
    beneficiary: Mapped[str] = mapped_column(String(200))
    payment: Mapped[str] = mapped_column(String(300), default="")
    target: Mapped[int] = mapped_column(Integer)
    raised: Mapped[int] = mapped_column(Integer, default=0)
    donors: Mapped[int] = mapped_column(Integer, default=0)
    days_left: Mapped[int] = mapped_column(Integer, default=30)
    status: Mapped[str] = mapped_column(String(30))
    budget: Mapped[list] = mapped_column(JSON, default=list)
    expenses: Mapped[list] = mapped_column(JSON, default=list)
    documents = relationship("Document", lazy="selectin", cascade="all, delete-orphan", order_by="Document.id")
    logs = relationship("VerificationLog", lazy="selectin", cascade="all, delete-orphan", order_by="VerificationLog.id")

    @property
    def ai_report(self):
        return self.logs[-1] if self.logs else None

    def receive_donation(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("Donation amount must be positive")
        self.raised += amount
        self.donors += 1
