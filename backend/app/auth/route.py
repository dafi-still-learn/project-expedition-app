# TEMPAT MELAKUKAN VALIDASI DARI DATA YANG DIGUNAKAN MENGGUNAKAN PYDANTIC
# MELAKUKAN ENDPOINT DARI FRONTEND DAN MENGEMBALIKAN NILAI BERDASARKAN DATA YANG DITERIMA DAN DIPROSES
from fastapi import APIRouter, Response, Request, HTTPException
from app.auth.schemas import requestLogin, requestRegister, roleUser, requestVerifyRole
from app.database.database_user import membuat_database_user, input_tabel_user, tampilkan_akun, validate_akun_register
from app.auth.security import make_access_token, make_refresh_token, hash_password, verify_password
from app.auth.keys import private_key, public_key
from app.auth.service import check_refresh_token, check_role_user_token, make_access_token_from_from_refresh
from app.auth.depedencies import check_credential_user, check_hash_password
from argon2 import PasswordHasher

ph = PasswordHasher()

router = APIRouter(prefix="/auth")

membuat_database_user()


# setelah mempelajari http-only cookie, baru akan mengirim data refresh token ke sana
@router.post("/login")
async def login(data: requestLogin, response: Response):
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
            
            response.set_cookie(
                key = "refresh_token",
                value = data_token["refresh_token"],
                httponly = True,
                secure = False,
                samesite="lax",
                max_age= 60 * 60 * 24 * 30,
                path="/"
            )
            
            check_role_user_token(data_token['access_token'], public_key)
            return {
                    "access_token": data_token['access_token'],
                    "success": True
                }
    else:
        print("data tidak ditemukan!")
        return False

@router.post("/register")
async def register(data: requestRegister):
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
        
# INI DIJALANKAN KALAU TOKEN AKSES SUDAH KADARLUARSA
@router.post("/refresh_token")
async def refresh_token(requests: Request):

    # BERISI DATA DARI REFRESH TOKEN
    data_cookie_refresh = requests.cookies.get("refresh_token")
    
    print("ini data dari refresh token",data_cookie_refresh)
    if data_cookie_refresh is None:
        raise HTTPException(status_code="401", detail="refresh_token tidak ditemukan")
        
    # KEMUDIAN PENGECEKKAN DATA DATABASE USER BERDASARKAN REFRESH TOKEN MELALUI DECODE
    
    # DAN MENGEMBALIKKAN ID DARI USER
    data_token_id_user = check_refresh_token(data_cookie_refresh, public_key)

    print("data role token", data_token_id_user)
    if data_token_id_user:
        new_access_token = make_access_token_from_from_refresh(private_key, data_token_id_user)
        # new_access_token = make_access_token(private_key, data_token_id_user)
        return {"access_token": new_access_token}
    else:
        return {"error": "Invalid refresh token"}


# MENGEMBALIKKAN ROLE DARI TOKEN
@router.post("/verify_role")
async def verify_role(data: requestVerifyRole):
    role_token = check_role_user_token(data.token, public_key)
    
    return role_token
