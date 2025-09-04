from fastapi import FastAPI
from app.api.main_router import router as main_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)
# Используем алембик
# Base.metadata.create_all(bind=engine) 

app.include_router(main_router, prefix="/api")