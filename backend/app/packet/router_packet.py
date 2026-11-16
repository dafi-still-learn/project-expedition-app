from fastapi import APIRouter, HTTPException, Depends
import locale
from app.packet.service import input_database_paket, get_data_harga_tanggal
from app.customers.service import get_data_all_pelanggan
from app.packet.schemas import data_pengiriman
from app.service.waktu_pengiriman_sampai import waktu_pengiriman

from app.wilayah.service import data_koordinat_wilayah

from app.wilayah.mengolah_wilayah_jarak import haversine

from app.service.generate_nomor_resi import generate_nomor_resi_paket

from app.service.logical_transaksi import logika_harga

from app.packet.resi_paket.service import get_data_resi_paket

from app.database.connection import get_db
from sqlalchemy.orm import Session
router_packet = APIRouter(prefix="/packet")


@router_packet.post("/input_packet")
def input_packet_user(data:data_pengiriman, db: Session = Depends(get_db)):
    try:        
        result_input = input_database_paket(db, data.nama_paket, data.nama_pengirim, data.jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, data.jarak_paket, data.nomor_hp_pengirim, data.nomor_hp_penerima, data.tanggal_pengiriman, data.tanggal_sampai, data.harga_pengiriman)
            
        print("ISI DARI RESULT INPUT DATABASE PAKET ", result_input)
        return {
            "result":result_input,
            "success": True
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# membuat_tabel_wilayah()
# import_csv_wilayah("app/database/data_wilayah.csv")

@router_packet.get("/harga_pengiriman")
def get_harga_pengiriman(berat: float, jarak: float, jalur= str, jenis= str):
    print("ini dari berat,", berat)
    print("ini dari berat,", jarak)
    print("ini dari berat,", jalur)
    print("ini dari berat,", jenis)
    try:
        harga_pengiriman = logika_harga(berat, jarak, jalur, jenis)
        
        locale.setlocale(locale.LC_ALL, "id_ID.UTF-8")
        
        hasil_dari_locale_harga = locale.currency(harga_pengiriman, grouping=True)
        
        print("ini hasil harga dari pengiriman", hasil_dari_locale_harga)
        return {"harga": hasil_dari_locale_harga}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@router_packet.get("/waktu_pengiriman")
def get_waktu_pengiriman(jarak: float, jalur= str):
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
        raise HTTPException(status_code=500, detail=str(e))
    
@router_packet.get("/jarak_pengiriman")
def get_jarak_pengiriman(db: Session = Depends(get_db), asal= str, tujuan= str):
    try:
        data_koordinat_asal = data_koordinat_wilayah(db, asal)
        
        data_koordinat_tujuan = data_koordinat_wilayah(db, tujuan)
        print("ini data dari asal", data_koordinat_asal)
        print("ini data dari tujuan", data_koordinat_tujuan)
        
        result_data_asal = data_koordinat_asal
        result_data_tujuan = data_koordinat_tujuan
        print("data dari koordinat asal", result_data_asal)
        
        print("data dari koordinat tujaun", result_data_tujuan)
        
        hasil_dari_package_wilayah = haversine(data_koordinat_asal, data_koordinat_tujuan)
        
        print(f"hasil dari package wilayah asal {round(hasil_dari_package_wilayah, 2)} km")
        
        return round(hasil_dari_package_wilayah, 2)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router_packet.get("/no_resi")
def get_no_resi(db: Session = Depends(get_db), id= int, pengirim= str):
    try:
        hasil_generate_no_resi = generate_nomor_resi_paket(id)
        
        print("isi dari data id paket ", hasil_generate_no_resi)
        
        return{
            "no_resi_paket": hasil_generate_no_resi,
            "pengirim": pengirim,
            "status": "diproses"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))        
    


@router_packet.get("/all")
def get_data_all_paket(db: Session = Depends(get_db)):
    try:
        rows_paket = get_data_harga_tanggal(db) or []
        # rows_pelanggan = get_data_all_pelanggan(db) or []
        
        # print("ini data semua dari paket ", rows_paket)
        # print("ini data semua pelanggan ", rows_pelanggan)
        return {
           "data_harga": [row["harga_pengiriman"] for row in rows_paket],
           "data_tanggal": [row["tanggal_pengiriman"] for row in rows_paket],
        #    "data_pelanggan": [row for row in rows_pelanggan],
           "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@router_packet.get("/resi_paket")
def get_all_data_resi_paket(resi_paket: str, db: Session = Depends(get_db)):
    try:
        print("RESI PAKET DARI FRONTEND", resi_paket)
        data_all = get_data_resi_paket(db, resi_paket)
        
        print("Data paket", data_all)
        if data_all is None:
            raise HTTPException(status_code=404, detail="Data resi paket tidak ditemukan")

        return {
            "id": data_all.id,
            "id_paket": data_all.id_paket,
            "nama_paket": data_all.nama_paket,
            "nomor_resi_paket": data_all.nomor_resi_paket,
            "raw_seed": data_all.raw_seed,
            "success": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
