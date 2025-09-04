from typing import List
from sqlalchemy.orm import Session
from app.models.cargo import Cargo
from app.models.enums import StatusEnum, SizeEnum
from app.schemas.cargo import CargoResponseSchema
class CargoService:
    
    @staticmethod
    def list_cargos(db: Session):
        cargos = db.query(Cargo).filter(Cargo.status.in_([StatusEnum.PENDING, StatusEnum.IN_PROGRESS])).all()
        result: dict[str, List[CargoResponseSchema]] = {
            "small": [],
            "medium": [],
            "large": []
        }
        for cargo in cargos:
            match cargo.size:
                case SizeEnum.SMALL:
                    result["small"].append(CargoResponseSchema.model_validate(cargo))
                case SizeEnum.MEDIUM:
                    result["medium"].append(CargoResponseSchema.model_validate(cargo))
                case SizeEnum.LARGE:
                    result["large"].append(CargoResponseSchema.model_validate(cargo))
        return result