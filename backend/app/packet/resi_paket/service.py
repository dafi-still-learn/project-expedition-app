from sqlalchemy.orm import Session
from app.packet.models import ResiPaket
from sqlalchemy import select
from app.wilayah.models import Wilayah
from app.packet.models import Paket

def get_data_resi_paket(db: Session, resi_paket):
    rows = db.scalars(select(ResiPaket).where(ResiPaket.nomor_resi_paket == resi_paket)).first()
    
    if rows is None:
        print("data tidak ditemukan")
    else:
        # PAKAI ID_PAKET RESI PAKET
        data_id_paket = db.scalars(select(Paket).where(Paket.id == rows.id_paket)).first()
        print("isi id paket", data_id_paket)
        
        # KEMUDIAN ID_PAKET DIGUNAKAN UNTUK AMBIL ASAL DAN TUJUAN PAKET
        data_lokasi_asal_paket = db.scalars(select(Wilayah).where(Wilayah.nama_wilayah == data_id_paket.asal_paket)).one()
        print("isi dari asal paket", data_lokasi_asal_paket)
        
        data_lokasi_tujuan_paket = db.scalars(select(Wilayah).where(Wilayah.nama_wilayah == data_id_paket.tujuan_paket)).one()
        print("isi data tujuan paket", data_lokasi_tujuan_paket)
        
        print(f"titik koordinat asal, {data_lokasi_asal_paket.lat_wilayah} {data_lokasi_asal_paket.long_wilayah}")
        
        print(f"titik koordinat tujuan , {data_lokasi_tujuan_paket.lat_wilayah} {data_lokasi_tujuan_paket.long_wilayah}")
        
        # DARI ASAL DAN TUJUAN AMBIL LAT DAN LONG
        # DIKIRIM KE FRONTEND UNTUK PETA
        return {
            "data_resi_paket": rows,
            "data_lokasi_asal": data_lokasi_asal_paket,
            "data_lokasi_tujuan": data_lokasi_tujuan_paket
        }
