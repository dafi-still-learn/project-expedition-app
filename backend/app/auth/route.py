# TEMPAT MELAKUKAN VALIDASI DARI DATA YANG DIGUNAKAN MENGGUNAKAN PYDANTIC
# MELAKUKAN ENDPOINT DARI FRONTEND DAN MENGEMBALIKAN NILAI BERDASARKAN DATA YANG DITERIMA DAN DIPROSES
from fastapi import APIRouter
from app.auth.schemas import requestLogin, requestRegister, roleUser
from app.database.database_user import membuat_database_user, input_tabel_user, validate_akun_login, tampilkan_akun, validate_akun_register
from app.auth.security import make_access_token, make_refresh_token, hash_password, verify_password
from app.auth.keys import private_key, public_key
from app.auth.service import check_refresh_token
from app.auth.depedencies import check_credential_user, check_hash_password
from argon2 import PasswordHasher

ph = PasswordHasher()

router = APIRouter(prefix="/auth")

membuat_database_user()


# setelah mempelajari http-only cookie, baru akan mengirim data refresh token ke sana
@router.post("/login")
def login(data: requestLogin):
    password_database_akun = check_hash_password(data.username)
    
    data_verifikasi_hashing = verify_password(password_database_akun, data.password)
    # data_verifikasi_hashing = ph.verify(password_database_akun, data.password)
        
    print("hasil validasi data", password_database_akun)

    if data_verifikasi_hashing == True:
        data_authentication = check_credential_user(data.username)
    
        print("hasil authentication",data_authentication)
        if data_authentication['success'] == True:
            data_token = {
                    "access_token": make_access_token(private_key, data_authentication["user_id"]),
                    "refresh_token": make_refresh_token(private_key, data_authentication["user_id"])
            }
   
            return {
                    "access_token": data_token['access_token'],
                    "success": True
                }
    else:
        print("data tidak ditemukan!")
        return False

@router.post("/register")
def register(data: requestRegister):
    hashed_password = hash_password(data.password)
    tampilkan_akun()
    
    hasil_validasi_register = validate_akun_register(data.email, data.username)
    print("ini register dari database")
    
    if hasil_validasi_register == True:
        data_register = input_tabel_user(
            data.email, data.username, hashed_password, roleUser.OPERATOR)

        return data_register
    else:
        print("salah")
@router.get("/refresh_token")
def refresh_token(refresh_token: str):
    data_token = check_refresh_token(refresh_token, public_key)

    if data_token:
        new_access_token = make_access_token(private_key, data_token['sub'])
        return {"access_token": new_access_token}
    else:
        return {"error": "Invalid refresh token"}
    
# @router.get("/verify_role")
# def verify_role(role: roleUser):
#     if check_role(role):
#         return {
#             "message": "Role admin verified successfully",
#             "success": True
#         }
#     else:
#         return {
#             "error": "Role admin verification failed",
#             "success": False
#         }