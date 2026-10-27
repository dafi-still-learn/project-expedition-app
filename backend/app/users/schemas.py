from pydantic import BaseModel
from datetime import date

class data_profil(BaseModel):
    user_id: int
    email_user: str
    nama_user: str
    nama_panggilan: str
    tanggal_lahir_user: date
    nomor_hp_user: str
    alamat_sekarang: str
    penempatan: str
    jabatan_sekarang: str
    
class requestCheckProfil(BaseModel):
    user_id: int