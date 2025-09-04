from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum, TIMESTAMP
from typing import List
from sqlalchemy.sql import func
from datetime import datetime
from app.models.base import Base
from app.models.enums import DirectionEnum, StatusEnum

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    direction: Mapped[DirectionEnum] = mapped_column(Enum(DirectionEnum), nullable=False)
    status: Mapped[StatusEnum] = mapped_column(Enum(StatusEnum), nullable=False, default=StatusEnum.PENDING)
    sender: Mapped[str] = mapped_column(nullable=False)
    phone_number: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    cargos: Mapped[List["Cargo"]] = relationship(back_populates="order", cascade="all, delete-orphan")
