from sqlalchemy.orm import Session
from app.models.slot import Slot
from app.schemas.slot import SlotCreateSchema

class SlotService:

    @staticmethod
    def get_slot(db: Session, lift_id: int):
        return db.query(Slot).filter(Slot.id == lift_id).first()

    @staticmethod
    def list_slots(db: Session):
        return db.query(Slot).all()
    
    @staticmethod
    def create_slot(db: Session, slot_data: SlotCreateSchema):
        new_slot: Slot = Slot(
            size = slot_data.size,
            lift_id = slot_data.lift_id
        )
        
        db.add(new_slot)
        db.commit()
        db.refresh(new_slot)

        return new_slot
    
    @staticmethod
    def assign_cargo(db: Session, slot_id: int, cargo_id: int):
        slot = db.query(Slot).filter(Slot.id == slot_id).first()
        if slot:
            if cargo_id == 0:
                slot.cargo_id = None
            else:
                slot.cargo_id = cargo_id
            db.commit()
            db.refresh(slot)
            return slot
        return None
