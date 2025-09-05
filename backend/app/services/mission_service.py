from sqlalchemy.orm import Session
from app.models.mission import Mission
from app.models.cargo import Cargo
from app.models.slot import Slot
from app.schemas.mission import MissionCreateSchema

class MissionService:
    @staticmethod
    def list_missions(db: Session):
        return db.query(Mission).all()

    @staticmethod
    def get_mission(db: Session, mission_id: int):
        return db.query(Mission).filter(Mission.id == mission_id).first()
    
    @staticmethod
    def get_last_mission(db: Session):
        return db.query(Mission).order_by(Mission.id.desc()).first()

    @staticmethod
    def create_mission(db: Session, mission_data: MissionCreateSchema):
        # Создаём объект Mission
        new_mission = Mission(
            direction=mission_data.direction,
            created_by=mission_data.created_by,
            departure_time=mission_data.departure_time,
            arrival_time=mission_data.arrival_time,
        )
        db.add(new_mission)
        db.flush()  # Получаем id миссии до связывания cargo

         # Находим все занятые слоты (cargo_id != NULL)
        occupied_slots = db.query(Slot).filter(Slot.cargo_id.isnot(None)).all()
        cargos = [slot.cargo for slot in occupied_slots if slot.cargo]

        # Привязываем грузы к миссии
        new_mission.cargos = cargos

        db.commit()
        db.refresh(new_mission)
        return new_mission