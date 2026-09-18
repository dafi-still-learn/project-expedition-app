from app.database.database_user import membuat_database_user, input_tabel_user, validate_akun_login,validate_akun_register
from fastapi import APIRouter

from app.schemas.schemas import login, register

router = APIRouter()


membuat_database_user()

@router.post("/login")
def login_user(data: login):
    result_login = validate_akun_login(data.username, data.password)
    
    if result_login == True:
        print("LOGIN SUKSES")
        
        return {
            "user_id": result_login['user_id'],
            "success": result_login['success']
        }
    else:
        return False
    
@router.post("/register")
def register_user(data: register):
    result_register = validate_akun_register(data.email, data.username, data.password)
    
    if result_register == True:
        input_tabel_user(data.email, data.username, data.password)
        
        print("validasi berhasil")
        
        return True
        
    else:
        return False