from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.mission import Mission
from app.schemas.mission import MissionResponseSchema, MissionCreateSchema
from app.services.mission_service import MissionService
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Missions"])

# --- Lift Endpoints ---

@router.get("/", response_model=list[MissionResponseSchema])
def list_missions(db: Session = Depends(get_db)):
    missions = MissionService.list_missions(db)
    return missions

@router.get("/{mission_id}")
def get_mission(mission_id: int, db: Session = Depends(get_db)):
    mission = MissionService.get_mission(db, mission_id)
    if mission:
        return MissionResponseSchema.model_validate(mission)
    else:
        return JSONResponse(status_code=404, content={"message": "Mission not found"})
    
@router.post("/")
def create_mission(lift_data: MissionCreateSchema, db: Session = Depends(get_db)):
    mission = MissionService.create_mission(db, lift_data)
    if mission:
        return {"message": "Mission created successfully", "mission_id": mission.id}
    else:
        return JSONResponse(status_code=400, content={"message": "Mission creation failed"})