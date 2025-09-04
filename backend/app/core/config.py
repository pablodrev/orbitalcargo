from pydantic_settings import BaseSettings
from authx import AuthXConfig
from datetime import timedelta



class Settings(BaseSettings):
    db_host: str
    db_port: int
    db_user: str
    db_password: str
    db_name: str

    SECRET_KEY: str
    JWT_ACCESS_TOKEN_EXPIRES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

authx_config = AuthXConfig()
authx_config.JWT_SECRET_KEY = settings.SECRET_KEY
authx_config.JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRES)
