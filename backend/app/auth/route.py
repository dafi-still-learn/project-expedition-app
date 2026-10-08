# TEMPAT MELAKUKAN VALIDASI DARI DATA YANG DIGUNAKAN MENGGUNAKAN PYDANTIC
from fastapi import FastAPI
from app.auth.security import make_access_token, make_refresh_token
from app.scripts.generate_keys import generate_key
route = FastAPI()


@route.get("auth/")
def send_token_access():
    data_key = generate_key()

    access_token = make_access_token(data_key['private_key'])
    refresh_token = make_refresh_token(data_key['private_key'])

    return access_token
