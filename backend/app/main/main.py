from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.database.base import *
from app.database.connection import Base, engine

from app.auth.router_auth import router_auth
from app.packet.router_packet import router_packet
from app.users.router_profil import router_profil
from app.customers.router_customers import router_customers
from app.wilayah.router import router_wilayah
from app.report.router_report import router_report
from app.delivery.router_delivery import router_delivery

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app:lifespan):
    print("server sedang dimulai")
    
    yield
    
    print("server sedang dihentikan")
    
app = FastAPI(lifespan=lifespan)

app.include_router(router_auth)
app.include_router(router_packet)
app.include_router(router_profil)
app.include_router(router_customers)
app.include_router(router_wilayah)
app.include_router(router_report)
app.include_router(router_delivery)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
