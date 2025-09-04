from pydantic import BaseModel, Field
from app.models.enums import SizeEnum

class CargoCreateScheme(BaseModel):
    name: str
    size: SizeEnum
    weight: float