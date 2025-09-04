from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.models.base import Base
from typing import List


class Role(Base):
    __tablename__ = "roles"

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    name: Mapped[String] = mapped_column(String, unique=True)

    users: Mapped[List["User"]] = relationship(back_populates="role")