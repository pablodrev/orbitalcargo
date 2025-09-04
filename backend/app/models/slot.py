# app/models/slot.py
from enum import Enum as PyEnum

from sqlalchemy import Column, Integer, ForeignKey, Text, Numeric, Boolean, Enum
from sqlalchemy.orm import relationship

from app.models.base import Base

class SlotSize(PyEnum):
    S = "S"
    M = "M"
    L = "L"

class Slot(Base):
    __tablename__ = "slot"

    id = Column(Integer, primary_key=True, index=True)
    lift_id = Column(Integer, ForeignKey("lift.id", ondelete="CASCADE"), nullable=False, index=True)
    code = Column(Text, unique=True, nullable=False)
    size = Column(Enum(SlotSize, name="slot_size"), nullable=False)  # если обязательно -> nullable=False
    max_weight_kg = Column(Numeric(10, 2), nullable=False)
    free = Column(Boolean, nullable=False, server_default="true")

    lift = relationship("Lift", back_populates="slots")

    def __repr__(self) -> str:
        return f"<Slot id={self.id} code={self.code} lift_id={self.lift_id}>"
