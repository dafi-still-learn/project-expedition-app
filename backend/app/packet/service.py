
from sqlalchemy import insert, select
from sqlalchemy.orm import Session
from app.packet.models import Paket, ResiPaket
from app.service.generate_nomor_resi import generate_nomor_resi_paket
from app.customers.models import Pelanggan

def input_database_paket(db: Session, nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman):
    
    smt = (insert(Paket).values(nama_paket=nama_paket, nama_pengirim=nama_pengirim, jenis_paket=jenis_paket, jumlah_paket=jumlah_paket,asal_paket=asal_paket, tujuan_paket=tujuan_paket, berat_paket=berat_paket, jalur_pengiriman=jalur_pengiriman,jarak_paket=jarak_paket, nomor_hp_pengirim=nomor_hp_pengirim, nomor_hp_penerima=nomor_hp_penerima, tanggal_pengiriman=tanggal_pengiriman, tanggal_sampai=tanggal_sampai, harga_pengiriman=harga_pengiriman).returning(id, nama_paket, nama_pengirim, asal_paket, tujuan_paket, jumlah_paket, nomor_hp_pengirim, harga_pengiriman))
    
    paket = db.scalars(smt).one()
    
    result_generate_resi = generate_nomor_resi_paket(paket["id"])
    
    resiPaket = ResiPaket(
        id_paket = paket["id"],
        nama_paket = paket["nama_paket"],
        nomor_resi_paket = result_generate_resi
    )
    
    
    db.add(resiPaket)
    db.refresh(resiPaket)
    
    rows_check_pelanggan = insert(select(Pelanggan).where(paket.nama_pengirim, paket.nomor_hp_pengirim))
    
    if rows_check_pelanggan is None:
        pelanggan_insert = (insert(Pelanggan).values(id_paket = paket.id, nama_pelanggan = paket.nama_pengirim, nomor_hp = paket.nomor_hp_pengirim, nama_paket = paket.nama_paket, asal_pengiriman = paket.asal_pengiriman, tujuan_pengiriman = paket.tujuan_pengirimn, jumlah_paket = paket.jumlah_paket, harga_pengiriman = harga_pengiriman).returning(nama_pelanggan, nomor_hp))
        
        pelanggan = db.scalars(pelanggan_insert).one()
    else:
        pelanggan_sudah_ada = Pelanggan(id_paket = paket.id, nama_pelanggan = pelanggan.nama_pelanggan, nomor_hp = pelanggan.nomor_hp,  nama_paket = paket.nama_paket, asal_pengiriman = paket.asal_paket, tujuan_pengiriman = paket.tujuan_paket, jumlah_paket = paket.jumlah_paket, harga_paket = paket.harga_pengiriman)
        
        db.add(pelanggan_sudah_ada)
        db.refresh(pelanggan_sudah_ada)
         
    
    db.commit()
    
    return{
        "id_paket": paket["id"],
        "nama_pengirim": paket["nama_pengirim"],
        "nama_paket": paket["nama_paket"],
        "success": True
    }

def cari_id_paket(db: Session, nama_pengirim)-> str:
    try:
        rows = db.scalars(select(Paket).where(Paket.nama_pengirim == nama_pengirim)).one()
        return rows
    except Exception as e:
        print("terjadi eror ambil id paket ", e)

def get_data_harga_tanggal(db :Session)-> str:
    try:
        rows = db.scalars(Paket(select(Paket).where(Paket.tanggal_pengiriman, Paket.harga_pengiriman))).all()
        return rows
    except Exception as e:
        print("eror ambil paket ", e)
    