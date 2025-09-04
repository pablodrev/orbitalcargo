# app/models/lift.py
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Text, Numeric, DateTime
from sqlalchemy.sql import func
from datetime import datetime

from app.models.base import Base

class Lift(Base):
    __tablename__ = "lift"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    max_payload_kg: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    slots: Mapped[list["Slot"]] = relationship("Slot", back_populates="lift", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Lift id={self.id} name={self.name}>"
