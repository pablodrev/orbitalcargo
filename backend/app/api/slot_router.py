from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.slot import Slot
from app.schemas.slot import Slot as SlotSchema

router = APIRouter(tags=["Slot"])

# --- Slot Endpoints ---

@router.get("/slots", response_model=list[SlotSchema])
def get_slots(db: Session = Depends(get_db)):
    return db.query(Slot).all()

@router.get("/slots/{slot_id}", response_model=SlotSchema)
def get_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(Slot).get(slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    return slot

@router.post("/slots", response_model=SlotSchema)
def create_slot(slot: SlotSchema, db: Session = Depends(get_db)):
    db_slot = Slot(**slot.dict())
    db.add(db_slot)
    db.commit()
    db.refresh(db_slot)
    return db_slot

@router.delete("/slots/{slot_id}")
def delete_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(Slot).get(slot_id)
    if not slot:
        raise HTTPException(status_code=404, detail="Slot not found")
    db.delete(slot)
    db.commit()
    return {"detail": "Slot deleted"}