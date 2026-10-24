from fastapi import APIRouter
from app.database.database_packet import membuat_database_paket, input_database_paket
from app.packet.schemas import data_pengiriman
from app.service.logical_transaksi import logika_harga
router_packet = APIRouter(prefix="/packet")

membuat_database_paket()

@router_packet.post("/input_packet")
def input_packet_user(data: data_pengiriman):
    try:
        jarak_paket = jarak_paket(data.tujuan_paket, data.asal_paket)
     
        harga_pengiriman = logika_harga(data.berat_paket, jarak_paket, data.jalur_pengiriman, data.jenis_paket)
        
        result_input = input_database_paket(data.nama_paket, data.jenis_paket, data.jumlah_paket, data.asal_paket, data.tujuan_paket, data.berat_paket, data.jalur_pengiriman, jarak_paket, harga_pengiriman)

        if result_input == True:
             logika_harga(data.berat_paket, )
        return result_input
    except Exception as e:
        print("terjadi eror pada input paket", e)