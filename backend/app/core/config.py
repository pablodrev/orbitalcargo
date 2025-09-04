from pydantic_settings import BaseSettings
from authx import AuthXConfig
from datetime import timedelta


class Settings(BaseSettings):
    db_host: str = "localhost"
    db_port: int = 5432
    db_user: str = "postgres"
    db_password: str = "password"
    db_name: str = "hackit"

    SECRET_KEY: str = "secretkey"
    JWT_ACCESS_TOKEN_EXPIRES: int = 30  

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

authx_config = AuthXConfig()
authx_config.JWT_SECRET_KEY = settings.SECRET_KEY
authx_config.JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=settings.JWT_ACCESS_TOKEN_EXPIRES)
