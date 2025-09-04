from sqlalchemy import ForeignKey, TIMESTAMP, func, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.models.base import Base
from app.models.enums import PositionEnum, StatusEnum, DoorStatesEnum

class Mission(Base):
    __tablename__ = "missions"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    destination: Mapped[Enum] = mapped_column(Enum(PositionEnum), nulllable=False)
    departure_time: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    arrival_time: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    status: Mapped[Enum] = mapped_column(Enum(StatusEnum), nullable=False)
    door_state: Mapped[Enum] = mapped_column(Enum(DoorStatesEnum), nullaable=False)

    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    created_by: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user: Mapped["User"] = relationship(back_populates="missioins")
