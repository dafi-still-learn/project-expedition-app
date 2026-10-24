from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.auth.router_auth import router_auth
from app.packet.router_packet import router_packet
from app.users.router_profil import router_profil


@asynccontextmanager
async def lifespan(app:lifespan):
    print("server sedang dimulai")
    
    yield
    
    print("server sedang dihentikan")
    
app = FastAPI(lifespan=lifespan)

app.include_router(router_auth)
app.include_router(router_packet)
app.include_router(router_profil)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
