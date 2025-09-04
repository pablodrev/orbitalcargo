from fastapi import APIRouter, Depends
from app.api.auth import router as auth_router
from app.api.order import router as order_router
from app.api.lift_router import router as lift_router
from app.api.slot_router import router as slot_router

router = APIRouter()
router.include_router(auth_router, prefix="/auth")
router.include_router(order_router, prefix="/order")
router.include_router(lift_router)
router.include_router(slot_router)