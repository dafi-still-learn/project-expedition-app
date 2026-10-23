from fastapi import APIRouter
from app.database.database_profil import membuat_tabel_profil, input_user_profil
from app.service.logical_transaksi import logika_harga
from app.users.schemas import data_profil
router = APIRouter(prefix="/profil")

membuat_tabel_profil()

@router.post("/input_profil")
def input_profil_user(data: data_profil):
    try:
        result_input = input_user_profil(data.nama_user, data.nama_panggilan, data.tanggal_lahir_user, data.nomor_hp_user, data.alamat_sekarang, data.penempatan, data.jabatan_sekarang)
    
        return result_input
    except Exception as e:
        print("terjadi eror pada input paket", e)