from pydantic import BaseModel
from typing import Optional
from decimal import Decimal
from app.models.enums import SizeEnum

class SlotCreateSchema(BaseModel):
    size: SizeEnum
    lift_id: int
    free: bool

class SlotSchema(SlotCreateSchema):
    id: int

    class Config:
        from_attributes = True
