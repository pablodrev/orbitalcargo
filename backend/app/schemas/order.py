from pydantic import BaseModel, Field
from typing import List
from app.models.enums import DirectionEnum
from app.schemas.cargo import CargoCreateScheme

class OrderCreateSchema(BaseModel):
    direction: DirectionEnum
    sender: str
    phone_number: str = Field(..., alias="phoneNumber")
    cargos: List[CargoCreateScheme]

