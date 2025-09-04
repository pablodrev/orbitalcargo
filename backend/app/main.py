from fastapi import FastAPI
from app.api.main_router import router as main_router
from app.models.base import Base
from app.database.database import engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(main_router, prefix="/api")