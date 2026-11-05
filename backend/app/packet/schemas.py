from pydantic import BaseModel
from datetime import date

class data_pengiriman(BaseModel):
    nama_paket: str
    nama_pengirim: str
    jenis_paket: str
    jumlah_paket: int
    asal_paket: str
    tujuan_paket: str
    berat_paket: float
    jalur_pengiriman: str
    jarak_paket: float
    nomor_hp_pengirim: str
    nomor_hp_penerima: str
    tanggal_pengiriman: str
    tanggal_sampai: str
    harga_pengiriman: str
