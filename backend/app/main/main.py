from fastapi.middleware.cors import CORSMiddleware
from app.router.router import router
from fastapi import FastAPI

app = FastAPI()

app.include_router(router)

app.middleware_stack(
    CORSMiddleware,
    allow_origin=["http://localhost:5173"],
    allow_credential = True,
    allow_methods=['*'],
    allow_headers=['*']
)