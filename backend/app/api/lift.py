from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.lift import Lift
from app.schemas.lift import LiftSchema, LiftCreateSchema
from app.services.lift_service import LiftService

router = APIRouter(tags=["Lift"])

# --- Lift Endpoints ---

@router.get("/", response_model=list[LiftSchema])
def list_lifts(db: Session = Depends(get_db)):
    lifts = LiftService.list_lifts(db)
    return lifts

@router.get("/{lift_id}")
def get_lift(lift_id: int, db: Session = Depends(get_db)):
    lift = LiftService.get_lift(db, lift_id)
    if lift:
        return lift
    else:
        return {"message": "Lift not found"}, 404
    
@router.post("/")
def create_lift(lift_data: LiftCreateSchema, db: Session = Depends(get_db)):
    lift = LiftService.create_lift(db, lift_data)
    if lift:
        return {"message": "Lift created successfully", "lift_id": lift.id}
    return {"message": "Lift creation failed"}, 400