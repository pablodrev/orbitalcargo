from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.order import OrderCreateSchema, OrderResponseSchema
from app.database import database
from app.services.order_service import OrderService


router = APIRouter(tags=['order'])

@router.post("/")
def create_order(order_data: OrderCreateSchema, db: Session = Depends(database.get_db)):
    order = OrderService.create_order(db, order_data)
    if order:
        return {"message": "Order created successfully", "order_id": order.id}
    return {"message": "Order creation failed"}, 400

@router.get("/", response_model=list[OrderResponseSchema])
def get_orders(db: Session = Depends(database.get_db)):
    orders = OrderService.get_orders(db)
    return orders