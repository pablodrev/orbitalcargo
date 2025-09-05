from sqlalchemy.orm import Session
from app.schemas.order import OrderCreateSchema, OrderResponseSchema
from app.models.order import Order
from app.models.cargo import Cargo
from app.models.enums import DirectionEnum, StatusEnum, PositionEnum

class OrderService:
    
    @staticmethod
    def create_order(db: Session, order_data: OrderCreateSchema):
        new_order: Order = Order(
            direction=order_data.direction,
            status=StatusEnum.PENDING,
            sender=order_data.sender,
            phone_number=order_data.phone_number,
        )
        new_order.cargos = [
            Cargo(
                name=cargo.name,
                size=cargo.size,
                weight=cargo.weight,
                position=PositionEnum.EARTH if new_order.direction == DirectionEnum.TO_ORBIT else PositionEnum.ORBIT
            ) 
            for cargo in order_data.cargos]
        
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        return new_order
    

    @staticmethod
    def list_orders(db: Session):
        orders = db.query(Order).all()
        return orders
    
    @staticmethod
    def get_order(db: Session, order_id: int):
        return db.query(Order).filter(Order.id == order_id).first()