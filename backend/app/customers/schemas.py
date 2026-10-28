from pydantic import BaseModel

class requestCustomers(BaseModel):
    id_paket: int
    nama_pelanggan: str
    nama_paket: str
    asal_pengiriman: str
    tujuan_pengiriman: str
    jumlah_paket: int
    harga_paket: str