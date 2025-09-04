from pydantic import BaseModel, ConfigDict
from app.models.enums import SizeEnum

class CargoCreateSchema(BaseModel):
    name: str
    size: SizeEnum
    weight: float

class CargoResponseSchema(BaseModel):
    id: int
    name: str
    size: SizeEnum
    weight: float
    order_id: int | None = None

    model_config = ConfigDict(from_attributes=True)