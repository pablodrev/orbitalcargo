from aiogram import BaseMiddleware
from sqlalchemy.orm import Session
from typing import Callable, Dict, Any, Awaitable

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from os import getenv

DB_USER = getenv("DB_HOST")
DB_PASSWORD = getenv("DB_PASSWORD")
DB_HOST = getenv("DB_HOST")
DB_PORT = getenv("DB_PORT")
DB_NAME = getenv("DB_NAME")

# DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
DATABASE_URL = "postgresql://postgres:postgres@5.129.243.99:5432/hackit_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class DatabaseMiddleware(BaseMiddleware):
    async def __call__(
        self,
        handler: Callable[[Any, Dict[str, Any]], Awaitable[Any]],
        event: Any,
        data: Dict[str, Any]
    ) -> Any:
        db: Session = SessionLocal()
        try:
            data["db"] = db  # прокидываем в handler через data
            return await handler(event, data)
        finally:
            db.close()