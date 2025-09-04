from pydantic import BaseModel
from typing import Optional
from enum import Enum
from decimal import Decimal

class SlotSize(str, Enum):
    S = "S"
    M = "M"
    L = "L"

class SlotBase(BaseModel):
    code: str
    size: Optional[SlotSize]
    max_weight_kg: Decimal
    free: Optional[bool] = True

class SlotCreate(SlotBase):
    lift_id: int

class Slot(SlotBase):
    id: int
    lift_id: int

    class Config:
        from_attributes = True
