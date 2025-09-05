from sqlalchemy.orm import Session
from app.models.mission import Mission
from app.models.enums import DoorStatesEnum
from app.schemas.mission import MissionCreateSchema

class FixLiftService:
    @staticmethod
    def fix_cable(db: Session):
        mission = db.query(Mission).order_by(Mission.id.desc()).first()
        if mission:
            mission.state = None
            db.commit()
            db.refresh(mission)
            return mission
        return None
    
    @staticmethod
    def fix_door(db: Session):
        mission = db.query(Mission).order_by(Mission.id.desc()).first()
        if mission:
            mission.state = None
            mission.door_state = DoorStatesEnum.CLOSED
            db.commit()
            db.refresh(mission)
            return mission
        return None
    