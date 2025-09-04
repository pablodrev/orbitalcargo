from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LiftBase(BaseModel):
    name: str
    max_payload_kg: float

class LiftCreate(LiftBase):
    pass

class Lift(LiftBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
