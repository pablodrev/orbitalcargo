from pydantic import BaseModel

class UserLoginSchema(BaseModel):
    username: str
    password: str

class UserRegisterSchema(BaseModel):
    username: str
    password: str
    role_id: int