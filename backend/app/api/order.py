from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.order import OrderCreateSchema, OrderResponseSchema
from app.database import database
from app.services.order_service import OrderService
from fastapi.responses import JSONResponse


router = APIRouter(tags=['Order'])

@router.post("/")
def create_order(order_data: OrderCreateSchema, db: Session = Depends(database.get_db)):
    order = OrderService.create_order(db, order_data)
    if order:
        return JSONResponse(status_code=201, content={"message": "Order created successfully", "order_id": order.id})
    return JSONResponse(status_code=400, content={"message": "Order creation failed"})

@router.get("/", response_model=list[OrderResponseSchema])
def list_orders(db: Session = Depends(database.get_db)):
    orders = OrderService.list_orders(db)
    return orders

@router.get("/{order_id}")
def get_order(order_id: int, db: Session = Depends(database.get_db)):
    order = OrderService.get_order(db, order_id)
    if order:
        return OrderResponseSchema.model_validate(order)
    else:
        return JSONResponse(status_code=404, content={"message": "Order not found"})