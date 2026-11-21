from decimal import Decimal
from sqlalchemy import insert, select
from sqlalchemy.orm import Session
from app.packet.models import Paket, ResiPaket
from app.service.generate_nomor_resi import generate_nomor_resi_paket
from app.customers.models import Pelanggan
from typing import List

def input_database_paket(db: Session, nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman):
    
    smt = (insert(Paket).values(nama_paket=nama_paket, nama_pengirim=nama_pengirim, jenis_paket=jenis_paket, jumlah_paket=jumlah_paket,asal_paket=asal_paket, tujuan_paket=tujuan_paket, berat_paket=berat_paket, jalur_pengiriman=jalur_pengiriman,jarak_paket=jarak_paket, nomor_hp_pengirim=nomor_hp_pengirim, nomor_hp_penerima=nomor_hp_penerima, tanggal_pengiriman=tanggal_pengiriman, tanggal_sampai=tanggal_sampai, harga_pengiriman=harga_pengiriman).returning(Paket))
    
    paket = db.scalars(smt).one()
    
    print("isi dari paket ", paket.id)
    if paket is None:
        print("data paket kosong atau tidak ditemukan")
    
    result_generate_resi = generate_nomor_resi_paket(paket.id)
    
    resiPaket = ResiPaket(
        id_paket = paket.id,
        nama_paket = paket.nama_paket,
        nomor_resi_paket = result_generate_resi["hasil_generate_resi_paket"],
        raw_seed = result_generate_resi["raw_seed"]
    )
    
    db.add(resiPaket)
    
    rows_check_pelanggan = db.scalars(select(Pelanggan).where(Pelanggan.nama_pelanggan == nama_pengirim).where(Pelanggan.nomor_hp == nomor_hp_pengirim)).first()
    
    if rows_check_pelanggan is None:
        pelanggan_insert = Pelanggan(id_paket = paket.id, nama_pelanggan = paket.nama_pengirim, nomor_hp = paket.nomor_hp_pengirim, nama_paket = paket.nama_paket, asal_pengiriman = paket.asal_paket, tujuan_pengiriman = paket.tujuan_paket, jumlah_paket = paket.jumlah_paket, harga_paket = paket.harga_pengiriman)
        db.add(pelanggan_insert)
        db.flush()
        pelanggan_digunakan = pelanggan_insert
    else:
        rows_check_pelanggan.id_paket = paket.id
        db.flush()
        pelanggan_digunakan = rows_check_pelanggan
    
    print(paket.id)
    db.commit()
    
    return{
        "id_paket": paket.id,
        "nama_pengirim": paket.nama_pengirim,
        "nama_paket": paket.nama_paket,
        "success": True
    }

def cari_id_paket(db: Session, nama_pengirim)-> str:
    try:
        rows = db.scalars(select(Paket).where(Paket.nama_pengirim == nama_pengirim)).one()
        return rows
    except Exception as e:
        print("terjadi eror ambil id paket ", e)
        return None

def get_data_all_paket(db: Session) -> List[dict]:
    try:
        rows = db.execute(select(
            Paket.id, 
            Paket.nama_paket, 
            Paket.nama_pengirim, 
            Paket.jenis_paket, 
            Paket.jumlah_paket, 
            Paket.asal_paket, 
            Paket.tujuan_paket, 
            Paket.berat_paket, 
            Paket.jalur_pengiriman, 
            Paket.jarak_paket, 
            Paket.nomor_hp_pengirim, 
            Paket.nomor_hp_penerima, 
            Paket.tanggal_pengiriman, 
            Paket.tanggal_sampai, 
            Paket.harga_pengiriman
        )).mappings().all()
        
        # Convert Decimal values to float for JSON serialization
        data = [
            {k: (float(v) if isinstance(v, Decimal) else v) for k, v in obj.items()}
            for obj in rows
        ]
        
        return data
    except Exception as e:
        print("terjadi error pda saat pengmbiln data semua paket, ", e)
        return []