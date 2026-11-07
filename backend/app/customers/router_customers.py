from fastapi import APIRouter, HTTPException
from app.database.database_customers import membuat_tabel_pelanggan, input_tabel_customers, get_data_all_pelanggan
from app.customers.schemas import requestCustomers

router_customers = APIRouter(prefix="/customers")

membuat_tabel_pelanggan()

router_customers.post("/input_customers")
def input_customers(data: requestCustomers):
    try:
        result_input_data_customers = input_tabel_customers(data.id_paket, data.nama_pelanggan, data.nama_paket, data.asal_pengiriman, data.tujuan_pengiriman,data.jumlah_paket, data.harga_paket)

        return result_input_data_customers
    
    except Exception as e:
        print("terjadi error pada penginputan data customers", e)

router_customers.get("all")
def get_all_data():
    try:
        result_get_data_pelanggan = get_data_all_pelanggan()
        
        print("ini data dari pelanggan", result_get_data_pelanggan)
        
        return{
            "data_all": result_get_data_pelanggan,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))