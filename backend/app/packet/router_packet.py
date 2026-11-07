from fastapi import APIRouter, HTTPException
import locale
from app.database.database_packet import input_database_paket, membuat_database_paket, get_data_all_paket
from app.database.database_customers import membuat_tabel_pelanggan
from app.packet.schemas import data_pengiriman
from app.service.waktu_pengiriman_sampai import waktu_pengiriman
from app.database.database_resi_paket import membuat_database_resi

from app.database.database_wilayah import data_koordinat_wilayah

from app.wilayah.mengolah_wilayah_jarak import haversine

from app.service.generate_nomor_resi import generate_nomor_resi_paket

from app.service.logical_transaksi import logika_harga
router_packet = APIRouter(prefix="/packet")

membuat_database_paket()
membuat_tabel_pelanggan()
membuat_database_resi()

@router_packet.post("/input_packet")
def input_packet_user(data: data_pengiriman):
    try:        
            
        result_input = input_database_paket(data.nama_paket, data.nama_pengirim, data.jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, data.jarak_paket, data.nomor_hp_pengirim, data.nomor_hp_penerima, data.tanggal_pengiriman, data.tanggal_sampai, data.harga_pengiriman)
            
        print("ISI DARI RESULT INPUT DATABASE PAKET ", result_input)
        return {
            "result":result_input,
            "success": True
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))

# membuat_tabel_wilayah()
# import_csv_wilayah("app/database/data_wilayah.csv")

@router_packet.get("/harga_pengiriman")
def get_harga_pengiriman(berat: float,jarak: float, jalur: str, jenis: str):
    try:
        harga_pengiriman = logika_harga(berat, jarak, jalur, jenis)
        
        locale.setlocale(locale.LC_ALL, "id_ID.UTF-8")
        
        hasil_dari_locale_harga = locale.currency(harga_pengiriman, grouping=True)
        
        print("ini hasil harga dari pengiriman", hasil_dari_locale_harga)
        return {"harga": hasil_dari_locale_harga}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))
        
@router_packet.get("/waktu_pengiriman")
def get_waktu_pengiriman(jarak: float, jalur:str):
    try:
        hasil_waktu = waktu_pengiriman(jarak, jalur)
        
        if hasil_waktu is None:
            return {"waktu_berangkat": None, "waktu_sampai": None}
        
        print("ini hasil waktu dari pengiriman", hasil_waktu["waktu_sampai"])
        return {
            "waktu_berangkat": hasil_waktu["waktu_berangkat"],
            "waktu_sampai": hasil_waktu["waktu_sampai"],
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))
    
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
        raise HTTPException(status_code=500, detail=(e))

@router_packet.get("/no_resi")
def get_no_resi(id: int, pengirim: str):
    try:
        hasil_generate_no_resi = generate_nomor_resi_paket(id)
        
        print("isi dari data id paket ", hasil_generate_no_resi)
        
        return{
            "no_resi_paket": hasil_generate_no_resi,
            "pengirim": pengirim,
            "status": "diproses"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))        
    

@router_packet.get("/all")
def get_data_all_paket():
    try:
        result_get_data_all_paket = get_data_all_paket()
    
        print("ini data semua dari paket ", result_get_data_all_paket)
    
        return{
            "data_all": result_get_data_all_paket,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))
    
