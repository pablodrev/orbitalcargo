from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from app.models.enums import SizeEnum

class SlotCreateSchema(BaseModel):
    lift_id: int
    size: SizeEnum

class SlotSchema(BaseModel):
    id: int
    size: SizeEnum
    cargo_id: Optional[int] = Field(alias="cargoId", default=None)

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
