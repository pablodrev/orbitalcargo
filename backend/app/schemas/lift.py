from pydantic import BaseModel
from typing import List
from typing import Optional
from datetime import datetime
from app.schemas.slot import SlotSchema


class LiftSchema(BaseModel):
    id: int
    name: str
    max_payload_kg: float
    created_at: datetime
    slots: List[SlotSchema]

    class Config:
        from_attributes = True

class LiftCreateSchema(BaseModel):
    name: str
    max_payload_kg: float
    
