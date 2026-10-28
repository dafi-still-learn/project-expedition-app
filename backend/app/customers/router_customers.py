from fastapi import APIRouter
from app.database.database_customers import membuat_tabel_pelanggan, input_tabel_customers
from app.customers.schemas import requestCustomers

router_customers = APIRouter(prefix="/customer")

membuat_tabel_pelanggan()

router_customers.post("/input_customers")
def input_customers(data: requestCustomers):
    try:
        result_input_data_customers = input_tabel_customers(data.id_paket, data.nama_pelanggan, data.nama_paket, data.asal_pengiriman, data.tujuan_pengiriman,data.jumlah_paket, data.harga_paket)

        return result_input_data_customers
    
    except Exception as e:
        print("terjadi error pada penginputan data customers", e)