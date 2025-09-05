from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database import database
from app.services.cargo_service import CargoService
from app.schemas.cargo import CargoResponseSchema

router = APIRouter(tags=['Cargo'])

@router.get("/")
def list_cargos(db: Session = Depends(database.get_db)):
    cargos = CargoService.list_cargos(db)
    if cargos:
        return cargos
    return JSONResponse(status_code=404, content={"message": "No cargos found"})

@router.get("/{cargo_id}")
def get_cargo(order_id: int, db: Session = Depends(database.get_db)):
    cargo = CargoService.get_cargo(db, order_id)
    if cargo:
        return CargoResponseSchema.model_validate(cargo)
    else:
        return JSONResponse(status_code=404, content={"message": "Cargo not found"})

#delete