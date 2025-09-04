from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.slot import Slot
from app.schemas.slot import SlotSchema, SlotCreateSchema
from app.services.slot_service import SlotService

router = APIRouter(tags=["Slot"])

# --- Slot Endpoints ---



@router.get("/", response_model=list[SlotSchema])
def list_slots(db: Session = Depends(get_db)):
    slots = SlotService.list_slots(db)
    return slots

@router.get("/{slot_id}")
def get_slot(slot_id: int, db: Session = Depends(get_db)):
    slot = SlotService.get_slot(db, slot_id)
    if slot:
        return slot
    else:
        return {"message": "Slot not found"}, 404

@router.post("/")
def create_slot(slot_data: SlotCreateSchema, db: Session = Depends(get_db)):
    slot = SlotService.create_slot(db, slot_data)
    if slot:
        return {"message": "Slot created successfully", "slot_id": slot.id}
    return {"message": "Slot creation failed"}, 400