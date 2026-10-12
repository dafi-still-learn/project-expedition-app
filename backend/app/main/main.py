from fastapi.middleware.cors import CORSMiddleware
from app.auth.route import router
from contextlib import asynccontextmanager
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app:lifespan):
    print("server sedang dimulai")
    
    yield
    
    print("server sedang dihentikan")
    
app = FastAPI(lifespan=lifespan)

app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
