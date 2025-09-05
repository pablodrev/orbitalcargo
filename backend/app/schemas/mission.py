from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from datetime import datetime
from app.models.enums import StatusEnum, DirectionEnum, DoorStatesEnum
from app.schemas.cargo import CargoResponseSchema

class MissionCreateSchema(BaseModel):
    direction: DirectionEnum
    created_by: int
    departure_time: Optional[datetime] = None
    arrival_time: Optional[datetime] = None
    #cargos: Optional[List[int]] = Field(default=None, description="List of cargo IDs")

class MissionResponseSchema(BaseModel):
    id: int
    direction: DirectionEnum
    status: StatusEnum
    state: str | None=None
    door_state: DoorStatesEnum
    departure_time: datetime
    arrival_time: Optional[datetime] = None
    created_by: int
    cargos: List[CargoResponseSchema] = []

    model_config = ConfigDict(from_attributes=True)