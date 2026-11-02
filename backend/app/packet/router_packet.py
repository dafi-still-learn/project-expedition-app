from fastapi import APIRouter
import locale
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.database.database_packet import membuat_database_paket, input_database_paket, cari_id_paket
from app.packet.schemas import data_pengiriman
from app.service.waktu_pengiriman_sampai import waktu_pengiriman
from app.database.database_wilayah import import_csv_wilayah, membuat_tabel_wilayah

from app.service.logical_transaksi import logika_harga
router_packet = APIRouter(prefix="/packet")

# membuat_database_resi()
# membuat_database_paket()

@router_packet.post("/input_packet")
def input_packet_user(data: data_pengiriman):
    try:        
        # MENGHASILKAN HARGA DARI PENGIRIMAN YANG SEDANG DILAKUKAN
        harga_pengiriman = logika_harga(data.berat_paket, data.jarak_paket, data.jalur_pengiriman, data.jenis_paket)
        
        locale.setlocale(locale.LC_ALL, "id_ID.UTF-8")

        hasil_dari_locale_harga = locale.currency(harga_pengiriman, grouping=True)
        print("ini hasil dari harga pengiriman dari harga pengiriman paket ", hasil_dari_locale_harga)  
        
        # MENAMPILKAN WAKTU UNTUK PENGIRIMAN
        hasil_waktu = waktu_pengiriman(data.jarak_paket, data.jalur_pengiriman)
            
        result_input = input_database_paket(data.nama_paket, data.nama_pengirim, data.  jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, data.jarak_paket, data.nomor_hp_pengirim, data.nomor_hp_penerima,hasil_waktu["waktu_berangkat"], hasil_waktu["waktu_sampai"], hasil_dari_locale_harga)
            
      
        return result_input
            
    except Exception as e:
        print("terjadi eror pada input paket", e)

# membuat_tabel_wilayah()
# import_csv_wilayah("app/database/data_wilayah.csv")

@router_packet.get("/harga_pengiriman")
def get_harga_pengiriman(berat_paket: float,jarak_paket: float, jalur_pengiriman: str, jenis_paket: str):
    try:
        harga_pengiriman = logika_harga(berat_paket, jarak_paket, jalur_pengiriman, jenis_paket)
        
        locale.setlocale(locale.LC_ALL, "id_ID.UTF-8")
        
        hasil_dari_locale_harga = locale.currency(harga_pengiriman, grouping=True)
        
        return hasil_dari_locale_harga
    
    except Exception as e:
        print("terjadi eror pada saat menghitung harga pengiriman", e)
        
@router_packet.get("/waktu_pengiriman")
def get_waktu_pengiriman(jarak_paket: float, jalur_pengiriman:str):
    try:
        hasil_waktu = waktu_pengiriman(jarak_paket, jalur_pengiriman)
        
        return hasil_waktu
    
    except Exception as e:
        print("terjadi eror pada saat menghitung waktu pengiriman ", e)
        