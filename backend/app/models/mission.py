from app.models.base import Base
from sqlalchemy import Column, Integer, String, Text,  TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime
from app.models.cargo import Cargo
from typing import List

class Mission(Base):
    __tablename__ = "missions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=True)

    departure_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    arrived_at: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=True)

    cargos: Mapped[List[Cargo]] = relationship("Cargo", back_populates="mission")
    
