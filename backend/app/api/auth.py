from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.security import security
from app.schemas.user import UserLoginSchema, UserRegisterSchema
from app.database import database
from app.services.user_service import UserService

router = APIRouter(tags=['auth'])

@router.post("/login")
def login(user_data: UserLoginSchema, db: Session = Depends(database.get_db)):
    user = UserService.login(db, user_data)
    if user:
        token = security.create_access_token(uid=str(user.id), data={"role": user.role.name})
        return {"access_token": token, "role": user.role.name}
    return {"message": "Invalid username or password"}, 401

@router.post("/register")
def register(user_data: UserRegisterSchema, db: Session = Depends(database.get_db)):
    user = UserService.register(db, user_data)
    if user:
        return {"message": "Registration successful"}
    return {"message": "Registration failed"}, 400