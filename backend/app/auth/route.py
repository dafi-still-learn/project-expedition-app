# TEMPAT MELAKUKAN VALIDASI DARI DATA YANG DIGUNAKAN MENGGUNAKAN PYDANTIC
# MELAKUKAN ENDPOINT DARI FRONTEND DAN MENGEMBALIKAN NILAI BERDASARKAN DATA YANG DITERIMA DAN DIPROSES
from fastapi import APIRouter
from app.auth.schemas import requestLogin, requestRegister, roleUser
from app.database.database_user import membuat_database_user, input_tabel_user, validate_akun_login
from app.auth.security import make_access_token, make_refresh_token, hash_password, verify_password
from app.auth.keys import private_key, public_key
from app.auth.service import check_refresh_token
from app.auth.depedencies import check_credential_user

router = APIRouter(prefix="/auth")

membuat_database_user()

user_role = 'user'


# setelah mempelajari http-only cookie, baru akan mengirim data refresh token ke sana
@router.get("/login")
def login(data: requestLogin):
    data_login = validate_akun_login(data.username, data.password)
    
    data_authentication = check_credential_user(data.username)
    
    if data_login['success']:
        if data_authentication:
            data_token = {
                "access_token": make_access_token(private_key, data_login['user_id']),
                "refresh_token": make_refresh_token(private_key, data_login['user_id'])
            }
   
            return {
                "access_token": data_token['access_token'],
                "success": True
            }
    
    return False

@router.get("/register")
def register(data: requestRegister):
    hashed_password = hash_password(data.password)
    
    data_register = input_tabel_user(
        data.email, data.username, hashed_password, roleUser)

    return data_register

@router.get("/refresh_token")
def refresh_token(refresh_token: str):
    data_token = check_refresh_token(refresh_token, public_key)

    if data_token:
        new_access_token = make_access_token(private_key, data_token['sub'])
        return {"access_token": new_access_token}
    else:
        return {"error": "Invalid refresh token"}
    
@router.get("/verify_role")
def verify_role(role: roleUser):
    if check_role(role):
        return {
            "message": "Role admin verified successfully",
            "success": True
        }
    else:
        return {
            "error": "Role admin verification failed",
            "success": False
        }