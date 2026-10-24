from pydantic import BaseModel

class data_pengiriman(BaseModel):
    nama_paket: str
    jenis_paket: str
    jumlah_paket: str
    asal_paket: str
    tujuan_paket: str
    berat_paket: str
    jalur_pengiriman: str
