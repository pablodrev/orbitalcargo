from sqlalchemy.orm import Session
from app.models.lift import Lift
from app.schemas.lift import LiftCreateSchema

class LiftService:

    @staticmethod
    def get_lift(db: Session, lift_id: int):
        return db.query(Lift).filter(Lift.id == lift_id).first()

    @staticmethod
    def list_lifts(db: Session):
        return db.query(Lift).all()
    
    @staticmethod
    def create_lift(db: Session, lift_data: LiftCreateSchema):
        new_lift: Lift = Lift(**lift_data.model_dump())
        
        db.add(new_lift)
        db.commit()
        db.refresh(new_lift)

        return new_lift