from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.mission import Mission
from app.schemas.mission import MissionResponseSchema, MissionCreateSchema
from app.services.mission_service import MissionService
from app.services.fix_lift_service import FixLiftService
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Missions"])

# --- Mission Endpoints ---

@router.get("/", response_model=list[MissionResponseSchema])
def list_missions(db: Session = Depends(get_db)):
    missions = MissionService.list_missions(db)
    return missions

@router.get("/last")
def get_last_mission(db: Session = Depends(get_db)):
    mission = MissionService.get_last_mission(db)
    if mission:
        return MissionResponseSchema.model_validate(mission)
    else:
        return JSONResponse(status_code=404, content={"message": "Mission not found"})

@router.get("/{mission_id}")
def get_mission(mission_id: int, db: Session = Depends(get_db)):
    mission = MissionService.get_mission(db, mission_id)
    if mission:
        return MissionResponseSchema.model_validate(mission)
    else:
        return JSONResponse(status_code=404, content={"message": "Mission not found"})
    
    
@router.post("/")
def create_mission(mission_data: MissionCreateSchema, db: Session = Depends(get_db)):
    mission = MissionService.create_mission(db, mission_data)
    if mission:
        return {"message": "Mission created successfully", "mission_id": mission.id}
    else:
        return JSONResponse(status_code=400, content={"message": "Mission creation failed"})
    
@router.patch("/last/fix_cable")
def fix_cable(db: Session = Depends(get_db)):
    mission = FixLiftService.fix_cable(db)
    if mission:
        return {"message": "Cable fixed successfully"}
    else:
        return JSONResponse(status_code=400, content={"message": "Failed to fix cable"})
    
@router.patch("/last/fix_door")
def fix_door(db: Session = Depends(get_db)):
    mission = FixLiftService.fix_door(db)
    if mission:
        return {"message": "Door fixed successfully"}
    else:
        return JSONResponse(status_code=400, content={"message": "Failed to fix door"})