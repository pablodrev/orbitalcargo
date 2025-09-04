from fastapi import APIRouter, Depends
from app.api.auth import router as auth_router
from app.api.order import router as order_router

router = APIRouter()
router.include_router(auth_router, prefix="/auth")
router.include_router(order_router, prefix="/order")