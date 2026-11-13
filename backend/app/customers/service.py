from sqlalchemy import select
from app.customers.models import Pelanggan
from sqlalchemy.orm import Session
from sqlalchemy import select

def get_insert_pelanggan(db: Session, id_paket, nama_pelanggan, nomor_hp_pelanggan, nama_paket,asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket):
    obj = Pelanggan(id_paket = id_paket, nama_pelanggan = nama_pelanggan, nomor_hp_pelanggan = nomor_hp_pelanggan, nama_paket = nama_paket, asal_pengiriman = asal_pengiriman, tujuan_pengiriman = tujuan_pengiriman, jumlah_paket = jumlah_paket, harga_paket = harga_paket)
    
    db.add(obj)
    db.commit()
    db.refresh(obj)
    
         
def check_pelanggan(db: Session, nama_pelanggan, nomor_hp):
    rows = db.scalars(select(Pelanggan).where(Pelanggan.nama_pelanggan is nama_pelanggan and Pelanggan.nomor_hp is nomor_hp))
    
    return rows


def get_data_all_pelanggan(db: Session):
    try:
        rows =  db.execute(select(Pelanggan)).mappings().all()

        print("data rows ", type(rows))
        return rows
    except Exception as e:
        print(e)
    
