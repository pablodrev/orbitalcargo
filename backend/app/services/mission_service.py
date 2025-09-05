from sqlalchemy.orm import Session
from app.models.mission import Mission
from app.models.cargo import Cargo
from app.schemas.mission import MissionCreateSchema

class MissionService:
    @staticmethod
    def list_missions(db: Session):
        return db.query(Mission).all()

    @staticmethod
    def get_mission(db: Session, mission_id: int):
        return db.query(Mission).filter(Mission.id == mission_id).first()

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

        # Если переданы id грузов, связываем их с миссией
        if mission_data.cargos:
            cargos = db.query(Cargo).filter(Cargo.id.in_(mission_data.cargos)).all()
            new_mission.cargos = cargos

        db.commit()
        db.refresh(new_mission)
        return new_mission