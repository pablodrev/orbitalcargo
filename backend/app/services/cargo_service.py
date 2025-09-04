from sqlalchemy.orm import Session
from app.models.cargo import Cargo

class CargoService:
    
    @staticmethod
    def list_cargos(db: Session):
        return db.query(Cargo).all()