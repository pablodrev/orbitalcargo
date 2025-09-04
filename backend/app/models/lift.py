# app/models/lift.py
from sqlalchemy import Column, Integer, Text, Numeric, DateTime, func
from sqlalchemy.orm import relationship

from app.models.base import Base

class Lift(Base):
    __tablename__ = "lift"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, unique=True, nullable=False)
    max_payload_kg = Column(Numeric(10, 2), nullable=False)  # precision: adjust if нужно
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # relationship -> список слотов
    slots = relationship("Slot", back_populates="lift", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Lift id={self.id} name={self.name}>"
