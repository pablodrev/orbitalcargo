from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.database import database
from app.services.cargo_service import CargoService

router = APIRouter(tags=['cargo'])

@router.get("/")
def list_cargos(db: Session = Depends(database.get_db)):
    cargos = CargoService.list_cargos(db)
    if cargos:
        return cargos
    return JSONResponse(status_code=404, content={"message": "No cargos found"})
