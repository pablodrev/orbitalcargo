from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import security
from app.schemas.user import UserLoginSchema, UserRegisterSchema
from app.schemas.order import OrderCreateSchema
from app.database import database
from app.services.order_service import OrderService


router = APIRouter(tags=['order'])

@router.post("/")
def create_order(order_data: OrderCreateSchema, db: Session = Depends(database.get_db)):
    order = OrderService.create_order(db, order_data)
    if order:
        return {"message": "Order created successfully", "order_id": order.id}
    return {"message": "Order creation failed"}, 400