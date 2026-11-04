from fastapi import APIRouter, Depends
import locale
from app.database.database_packet import input_database_paket
from app.packet.schemas import data_pengiriman
from app.service.waktu_pengiriman_sampai import waktu_pengiriman

from app.database.database_wilayah import data_koordinat_wilayah

from app.wilayah.mengolah_wilayah_jarak import create_package, haversine


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
        
        print("ini hasil harga dari pengiriman", hasil_dari_locale_harga)
        return hasil_dari_locale_harga
    
    except Exception as e:
        print("terjadi eror pada saat menghitung harga pengiriman", e)
        
@router_packet.get("/waktu_pengiriman")
def get_waktu_pengiriman(jarak_paket: float, jalur_pengiriman:str):
    try:
        hasil_waktu = waktu_pengiriman(jarak_paket, jalur_pengiriman)
        
        print("ini hasil waktu dari pengiriman", hasil_waktu)
        return hasil_waktu
    
    except Exception as e:
        print("terjadi eror pada saat menghitung waktu pengiriman ", e)

@router_packet.get("/jarak_pengiriman")
def get_jarak_pengiriman(asal: str, tujuan: str):
    try:
        data_koordinat_asal = data_koordinat_wilayah(asal)
        
        data_koordinat_tujuan = data_koordinat_wilayah(tujuan)
        
        print("data dari koordinat asal", data_koordinat_asal)
        
        print("data dari koordinat tujaun", data_koordinat_tujuan)
        
        hasil_dari_package_wilayah = haversine(data_koordinat_asal, data_koordinat_tujuan)
        
        print(f"hasil dari package wilayah asal {round(hasil_dari_package_wilayah, 2)} km")
        
        return round(hasil_dari_package_wilayah, 2)
        
    except Exception as e:
        print("terjadi error pada saat mencari data koordinat berdasarkan kode wilayah", e)
        