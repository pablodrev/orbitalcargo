import enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, Enum, ForeignKey, TIMESTAMP
from typing import List
from sqlalchemy.sql import func
from datetime import datetime
from app.models.base import Base


class StatusEnum(enum.Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    DELIVERED = "Delivered"
    CANCELLED = "Cancelled"

class DirectionEnum(enum.Enum):
    TO_ORBIT = "To Orbit"
    TO_EARTH = "To Earth"

class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    direction: Mapped[DirectionEnum] = mapped_column(Enum(DirectionEnum), nullable=False)
    status: Mapped[StatusEnum] = mapped_column(Enum(StatusEnum), nullable=False, default=StatusEnum.PENDING)
    contact: Mapped[str] = mapped_column(nullable=False)
    contact_phone: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    items: Mapped[List["Item"]] = relationship(back_populates="order")

