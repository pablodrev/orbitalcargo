from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.slot import SlotSchema, SlotCreateSchema
from app.services.slot_service import SlotService
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Slot"])

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
        return JSONResponse(status_code=404, content={"message": "Slot not found"})

@router.post("/")
def create_slot(slot_data: SlotCreateSchema, db: Session = Depends(get_db)):
    slot = SlotService.create_slot(db, slot_data)
    if slot:
        return {"message": "Slot created successfully", "slot_id": slot.id}
    return JSONResponse(status_code=400, content={"message": "Slot creation failed"})

@router.patch("/{slot_id}/assign-cargo/{cargo_id}")
def assign_cargo_to_slot(slot_id: int, cargo_id: int, db: Session = Depends(get_db)):
    slot = SlotService.assign_cargo(db, slot_id, cargo_id)
    if slot:
        return {"message": "Cargo assigned to slot successfully"}
    return JSONResponse(status_code=400, content={"message": "Failed to assign cargo to slot"})