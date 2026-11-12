from fastapi import APIRouter, HTTPException, Depends
from app.users.profil.service import input_user_profil, check_data_profil
from app.users.schemas import data_profil, requestCheckProfil
from app.database.connection import get_db
from sqlalchemy.orm import Session
router_profil = APIRouter(prefix="/profil")

@router_profil.post("/input_profil")
def input_profil_user(db: Session = Depends(get_db), data= data_profil):
    try:
        result_input = input_user_profil(db, data.user_id, data.email_user, data.nama_user, data.nama_panggilan, data.tanggal_lahir_user, data.nomor_hp_user, data.alamat_sekarang, data.penempatan, data.jabatan_sekarang)
    
        return result_input
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))
                
@router_profil.post("/check_profil")
def result_check_data_profil(db: Session=Depends(get_db), data= requestCheckProfil):
    print("isi user_id", data.user_id)
    try:
        result_check_profil = check_data_profil(db, data.user_id)
        
        print("INI ISI DARI CHECK DATA PROFIL", result_check_profil)
        return result_check_profil
    
    except Exception as e:
        raise HTTPException(status_code=404, detail=(e))        