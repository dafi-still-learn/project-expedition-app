from pydantic import BaseModel
from datetime import date

class data_pengiriman(BaseModel):
    nama_paket: str
    nama_pengirim: str
    jenis_paket: str
    jumlah_paket: int
    asal_paket: str
    tujuan_paket: str
    berat_paket: str
    jalur_pengiriman: str
    jarak_paket: str
    nomor_hp_pengirim: str
    nomor_hp_penerima: str
    tanggal_pengiriman: date
    tanggal_sampai: date
    harga_pengiriman: str
    nomor_resi_paket: str
