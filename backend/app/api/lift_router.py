from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.lift import Lift
from app.schemas.lift import Lift as LiftSchema

router = APIRouter(tags=["Lift"])

# --- Lift Endpoints ---

@router.get("/lifts", response_model=list[LiftSchema])
def get_lifts(db: Session = Depends(get_db)):
    return db.query(Lift).all()

@router.get("/lifts/{lift_id}", response_model=LiftSchema)
def get_lift(lift_id: int, db: Session = Depends(get_db)):
    lift = db.query(Lift).get(lift_id)
    if not lift:
        raise HTTPException(status_code=404, detail="Lift not found")
    return lift