from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.cargo import CargoResponseSchema
from app.database import database
from app.services.cargo_service import CargoService

router = APIRouter(tags=['cargo'])

@router.get("/", response_model=list[CargoResponseSchema])
def get_cargos(db: Session = Depends(database.get_db)):
    cargos = CargoService.get_cargos(db)
    return cargos