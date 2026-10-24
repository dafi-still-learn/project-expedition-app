from pydantic import BaseModel

class data_profil(BaseModel):
    nama_user: str
    nama_panggilan: str
    tanggal_lahir_user: str
    nomor_hp_user: str
    alamat_sekarang: str
    penempatan: str
    jabatan_sekarang: str
    
class requestCheckProfil(BaseModel):
    user_id: int