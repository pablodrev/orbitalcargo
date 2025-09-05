from app.models.base import Base
from sqlalchemy import ForeignKey, Column, Integer, String, Text,  TIMESTAMP, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime
from app.models.cargo import Cargo
from app.models.enums import StatusEnum, DirectionEnum, DoorStatesEnum
from typing import List

class Mission(Base):
    __tablename__ = "missions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    direction: Mapped[DirectionEnum] = mapped_column(Enum(DirectionEnum), nullable=False)
    state: Mapped[Text] = mapped_column(Text, nullable=True)
    status: Mapped[StatusEnum] = mapped_column(Enum(StatusEnum), nullable=False, default=StatusEnum.PENDING)
    door_state: Mapped[DoorStatesEnum] = mapped_column(Enum(DoorStatesEnum), nullable=False, default=DoorStatesEnum.CLOSED)

    departure_time: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    arrival_time: Mapped[datetime] = mapped_column(TIMESTAMP, nullable=True)

    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False) # в случае кибератаки будет ясно, чей аккаунт взломан

    cargos: Mapped[List["Cargo"]] = relationship("Cargo", back_populates="mission", cascade="all, delete-orphan")
    
