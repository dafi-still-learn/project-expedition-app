from fastapi import APIRouter
from app.database.database_packet import membuat_database_paket, input_database_paket, cari_id_paket
from app.database.database_customers import input_tabel_customers
from app.packet.schemas import data_pengiriman
from app.service.logical_transaksi import logika_harga
from app.service.waktu_pengiriman_sampai import waktu_pengiriman_darat,waktu_pengiriman_laut,waktu_pengiriman_udara

from app.database.database_resi_paket import membuat_database_resi, input_tabel_resi_paket

from app.service.generate_nomor_resi import data_id_paket, generate_nomor_resi_paket
router_packet = APIRouter(prefix="/packet")

membuat_database_resi()
membuat_database_paket()

@router_packet.post("/input_packet")
def input_packet_user(data: data_pengiriman):
    try:
        harga_pengiriman = logika_harga(data.berat_paket, data.jarak_paket, data.jalur_pengiriman, data.jenis_paket)
        if(data.jalur_pengiriman == "darat"):
            hasil_waktu = waktu_pengiriman_darat(data.jarak_paket, data.jalur_pengiriman)
            
            result_input = input_database_paket(data.nama_paket, data.nama_pengirim, data.  jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, data.jarak_paket, data.nomor_hp_pengirim, data.nomor_hp_penerima,hasil_waktu["waktu_berangkat"], hasil_waktu["waktu_sampai"], harga_pengiriman)
            
            result_data_user_id = data_id_paket(data.nama_paket)
            nomor_resi_paket = generate_nomor_resi_paket(result_data_user_id)

            if result_input == True:
                hasil_cari_id_paket = cari_id_paket(data.nama_pengirim)
                            
                result_input_tabel_customers = input_tabel_customers(hasil_cari_id_paket, data.nama_pengirim, data.nama_paket, data.asal_paket, data.tujuan_paket, data.jumlah_paket, data.harga_pengiriman)
                            
                return result_input_tabel_customers
            
        elif(data.jalur_pengiriman == "laut"):
            hasil_waktu = waktu_pengiriman_laut(data.jarak_paket, data.jalur_pengiriman)
            
            result_input = input_database_paket(data.nama_paket, data.nama_pengirim, data.jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, data.jarak_paket, data.nomor_hp_pengirim, data.nomor_hp_penerima,hasil_waktu["waktu_berangkat"], hasil_waktu["waktu_sampai"], harga_pengiriman, nomor_resi_paket)
            
            result_data_user_id = data_id_paket(data.nama_paket)
            nomor_resi_paket = generate_nomor_resi_paket(result_data_user_id)
            if result_input == True:
                hasil_cari_id_paket = cari_id_paket(data.nama_pengirim)
                                        
                result_input_tabel_customers = input_tabel_customers(hasil_cari_id_paket, data.nama_pengirim, data.nama_paket, data.asal_paket, data.tujuan_paket, data.jumlah_paket, data.harga_pengiriman)
                                        
                return result_input_tabel_customers
            
        elif(data.jalur_pengiriman == "udara"):
            hasil_waktu = waktu_pengiriman_udara(data.jarak_paket, data.jalur_pengiriman)
            
            result_input = input_database_paket(data.nama_paket, data.nama_pengirim, data.jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, data.jarak_paket, data.nomor_hp_pengirim, data.nomor_hp_penerima,hasil_waktu["waktu_berangkat"], hasil_waktu["waktu_sampai"], harga_pengiriman, nomor_resi_paket)
            
            
            result_data_user_id = data_id_paket(data.nama_paket)
            nomor_resi_paket = generate_nomor_resi_paket(result_data_user_id)
            if result_input == True:
                hasil_cari_id_paket = cari_id_paket(data.nama_pengirim)
                                        
                result_input_tabel_customers = input_tabel_customers(hasil_cari_id_paket, data.nama_pengirim, data.nama_paket, data.asal_paket, data.tujuan_paket, data.jumlah_paket, data.harga_pengiriman)
                                        
                return result_input_tabel_customers
        
    except Exception as e:
        print("terjadi eror pada input paket", e)