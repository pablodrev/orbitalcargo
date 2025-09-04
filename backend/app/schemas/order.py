from pydantic import BaseModel, Field, ConfigDict
from typing import List
from app.models.enums import DirectionEnum
from app.schemas.cargo import CargoCreateSchema, CargoResponseSchema

class OrderCreateSchema(BaseModel):
    direction: DirectionEnum
    sender: str
    phone_number: str = Field(..., alias="phoneNumber")
    cargos: List[CargoCreateSchema]

class OrderResponseSchema(BaseModel):
    id: int
    direction: DirectionEnum
    sender: str
    phone_number: str = Field(alias="phoneNumber")
    status: str
    cargos: List[CargoResponseSchema]

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

