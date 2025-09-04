from sqlalchemy.orm import Session
from app.models.slot import Slot
from app.schemas.slot import SlotCreateSchema
from app.models.enums import SizeEnum

class SlotService:

    @staticmethod
    def get_slot(db: Session, lift_id: int):
        return db.query(Slot).filter(Slot.id == lift_id).first()

    @staticmethod
    def list_slots(db: Session):
        return db.query(Slot).all()
    
    @staticmethod
    def create_slot(db: Session, slot_data: SlotCreateSchema):
        print(slot_data)
        print(type(slot_data.size))
        new_slot: Slot = Slot(
            size = slot_data.size,
            lift_id = slot_data.lift_id,
            free = slot_data.free
        )
        
        db.add(new_slot)
        db.commit()
        db.refresh(new_slot)

        return new_slot