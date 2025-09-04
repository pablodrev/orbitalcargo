# app/models/slot.py
from typing import TYPE_CHECKING

from sqlalchemy import Enum, Numeric, Text, Boolean, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import SizeEnum

class Slot(Base):
    __tablename__ = "slot"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    lift_id: Mapped[int] = mapped_column(ForeignKey("lift.id", ondelete="CASCADE"), nullable=False, index=True)
    size: Mapped[SizeEnum] = mapped_column(Enum(SizeEnum, name="slot_size"), nullable=False)
    free: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default="true")

    lift: Mapped["Lift"] = relationship("Lift", back_populates="slots")

    def __repr__(self) -> str:
        return f"<Slot id={self.id} code={self.code} lift_id={self.lift_id}>"
