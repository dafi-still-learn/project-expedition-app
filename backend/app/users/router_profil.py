from fastapi import APIRouter
from app.database.database_profil import membuat_tabel_profil, input_user_profil, check_data_profil
from app.users.schemas import data_profil, requestCheckProfil
router_profil = APIRouter(prefix="/profil")

membuat_tabel_profil()

@router_profil.post("/input_profil")
def input_profil_user(data: data_profil):
    try:
        result_input = input_user_profil(data.user_id, data.email_user, data.nama_user, data.nama_panggilan, data.tanggal_lahir_user, data.nomor_hp_user, data.alamat_sekarang, data.penempatan, data.jabatan_sekarang)
    
        return result_input
    except Exception as e:
        print("terjadi eror pada input paket", e)
        
@router_profil.post("/check_profil")
def result_check_data_profil(data: requestCheckProfil):
    print("isi user_id", data.user_id)
    try:
        result_check_profil = check_data_profil(data.user_id)
        
        print("INI ISI DARI CHECK DATA PROFIL", result_check_profil)
        return result_check_profil
    
    except Exception as e:
        print("terjadi error pada saat mengecek profil", e)
        