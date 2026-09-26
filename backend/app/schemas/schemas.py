from pydantic import BaseModel


class register(BaseModel):
    email: str
    username: str
    password: str


class login(BaseModel):
    username: str
    password: str


class validate_register(BaseModel):
    email: str
    username: str


class validate_login(BaseModel):
    username: str
    password: str


class lupa_password(BaseModel):
    email: str


class data_pengiriman(BaseModel):
    nama_paket: str
    jenis_paket: str
    jumlah_paket: str
    asal_paket: str
    tujuan_paket: str
    berat_paket: str
    mitra_pengiriman: str
