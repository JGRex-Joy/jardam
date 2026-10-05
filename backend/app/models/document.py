from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from ..core.database import Base


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(primary_key=True)
    campaign_id: Mapped[int] = mapped_column(ForeignKey("campaigns.id"))
    name: Mapped[str] = mapped_column(String(300))
    kind: Mapped[str] = mapped_column(String(30), default="document")
    url: Mapped[str] = mapped_column(Text)
