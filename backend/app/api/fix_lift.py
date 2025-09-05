from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.mission import Mission
from app.schemas.mission import MissionResponseSchema, MissionCreateSchema
from app.services.mission_service import MissionService
from app.services.fix_lift_service import FixLiftService
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Fix Lift"])

# --- Fix Lift Endpoints ---

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
