# TEMPAT MELAKUKAN VALIDASI DARI DATA YANG DIGUNAKAN MENGGUNAKAN PYDANTIC
from fastapi import APIRouter
from app.auth.security import make_access_token, make_refresh_token
from app.scripts.generate_keys import generate_key
from app.auth.schemas import requestLogin, requestRegister, roleUser
from app.database.database_user import membuat_database_user, input_tabel_user, validate_akun_login

router = APIRouter(prefix="/auth")

membuat_database_user()

user_role = 'user'


@router.get("/login")
def login(data: requestLogin):
    data_key = generate_key()

    data_login = validate_akun_login(data.username, data.password)

    access_token = make_access_token(data_key['private_key'])
    make_refresh_token(data_key['private_key'])

    return {
        'access_token': access_token,
        'result_login': data_login
    }


@router.get("/register")
def register(data: requestRegister):
    data_register = input_tabel_user(
        data.email, data.username, data.password, roleUser)

    return data_register
