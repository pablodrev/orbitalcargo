from sqlalchemy import ForeignKey, TIMESTAMP, func, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.models.base import Base
from app.models.order import StatusEnum
from app.models.enums import SizeEnum, PositionEnum

class Cargo(Base):
    __tablename__ = "cargos"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    size: Mapped[SizeEnum] = mapped_column(Enum(SizeEnum), nullable=False)
    weight: Mapped[float] = mapped_column(nullable=False)
    position: Mapped[PositionEnum] = mapped_column(Enum(PositionEnum), nullable=False)
    status: Mapped[StatusEnum] = mapped_column(Enum(StatusEnum), nullable=False, default=StatusEnum.PENDING)
    
    mission_id: Mapped[int] = mapped_column(ForeignKey("missions.id"), nullable=True)
    mission: Mapped["Mission"] = relationship(back_populates="cargos")

    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"), nullable=False)
    order: Mapped["Order"] = relationship(back_populates="cargos")

    slot: Mapped["Slot"] = relationship(back_populates="cargo", uselist=False)

    created_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
