from fastapi import APIRouter, Depends
from app.api.auth import router as auth_router
from app.api.order import router as order_router
from app.api.lift import router as lift_router
from app.api.slot import router as slot_router
from app.api.cargo import router as cargo_router
from app.api.missions import router as mission_router

router = APIRouter()
router.include_router(auth_router, prefix="/auth")
router.include_router(order_router, prefix="/order")
router.include_router(lift_router, prefix="/lift")
router.include_router(slot_router, prefix="/slot")
router.include_router(cargo_router, prefix="/cargos")
router.include_router(mission_router, prefix="/missions")
