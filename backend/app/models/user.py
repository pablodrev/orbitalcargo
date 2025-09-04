from sqlalchemy import Column, Integer, String
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from app.models.base import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[Integer] = mapped_column(Integer, primary_key=True)
    username: Mapped[String] = mapped_column(String, unique=True, nullable=False, index=True)
    hashed_password: Mapped[String] = mapped_column(String, nullable=False)
    
    role_id: Mapped[Integer] = mapped_column(ForeignKey("roles.id"), nullable=False)
    role: Mapped["Role"] = relationship(back_populates="users")
