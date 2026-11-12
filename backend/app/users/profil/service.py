# TEMPAT BERBAGAI MACAM FITUR DARI USER, SEPERTI EDIT PROFIL, CHANGE PASSWORD, PROFIL
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.users.profil.models import Profil

def input_user_profil(db: Session, user_id, email_user, nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang):
 
    profil = Profil(user_id = user_id, email_user = email_user, nama_user = nama_user, nama_panggilan = nama_panggilan, tanggal_lahir_user = tanggal_lahir_user, nomor_hp_user = nomor_hp_user, alamat_sekarang = alamat_sekarang, penempatan = penempatan, jabatan_sekarang = jabatan_sekarang)
    
    db.add(profil)
    db.refresh(profil)
    db.commit()
    
    return True
    
def check_data_profil(db: Session, user_id):
    rows = db.scalars(select(Profil).where(Profil.user_id == user_id)).one()
    
    if rows is None:
        return False
    
    return True
        