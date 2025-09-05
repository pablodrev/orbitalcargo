from sqlalchemy import Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base
from app.models.enums import SizeEnum

class Slot(Base):
    __tablename__ = "slot"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    size: Mapped[SizeEnum] = mapped_column(Enum(SizeEnum, name="slot_size"), nullable=False)

    cargo_id: Mapped[int] = mapped_column(ForeignKey("cargos.id", ondelete="SET NULL"), nullable=True, index=True)
    cargo: Mapped["Cargo"] = relationship(back_populates="slot")

    lift_id: Mapped[int] = mapped_column(ForeignKey("lift.id", ondelete="CASCADE"), nullable=False, index=True)
    lift: Mapped["Lift"] = relationship("Lift", back_populates="slots")
