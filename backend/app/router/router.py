from app.database.database_user import membuat_database_user, input_tabel_user, validate_akun_login, validate_akun_register, lupa_password_user, tampilkan_akun
from fastapi import APIRouter

from app.schemas.schemas import login, register, lupa_password

router = APIRouter()


membuat_database_user()


@router.post("/login")
def login_user(data: login):
    result_login = validate_akun_login(data.username, data.password)

    tampilkan_akun()
    print("hasil dari result login", result_login)
    if result_login['success']:
        print("LOGIN SUKSES")

        return {
            "user_id": result_login['user_id'],
            "success": result_login['success']
        }
    else:
        return False


@router.post("/register")
def register_user(data: register):
    result_register = validate_akun_register(
        data.email, data.username)

    tampilkan_akun()
    print("hasil dari register database", result_register)
    if result_register == True:
        input_tabel_user(data.email, data.username, data.password)

        print("validasi berhasil")

        return True

    else:
        return False


@router.post("/email")
def lupa_akun_user(data: lupa_password):
    data = lupa_password_user(data.email)

    if data == False:
        print("EMAIL YANG DIMASUKKAN TIDAK TERSEDIA")

        return True

    return True
