from app.schemas.user import UserLoginSchema, UserRegisterSchema
from app.models.user import User
from sqlalchemy.orm import Session
import bcrypt

def hash_password(password: str) -> str:
    bytes = password.encode("utf-8")
    salt = bcrypt.gensalt()

    return bcrypt.hashpw(bytes, salt).decode("utf-8")

def check_password(user_password: str, hashed_password: str) -> bool:
    bytes = user_password.encode("utf-8")

    return bcrypt.checkpw(bytes, hashed_password.encode("utf-8"))


class UserService:

    @staticmethod
    def login(db: Session, user_data: UserLoginSchema):
        user = db.query(User).filter(User.username == user_data.username).first()
        if user and check_password(user_data.password, user.hashed_password):
            return user
        return None
    
    @staticmethod
    def register(db: Session, user_data: UserRegisterSchema):
        hashed_password = hash_password(user_data.password)
        new_user = User(username=user_data.username, hashed_password=hashed_password, role_id=user_data.role_id)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user