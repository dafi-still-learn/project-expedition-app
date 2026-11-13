from fastapi import APIRouter, HTTPException, Depends
from app.customers.service import get_data_all_pelanggan, get_insert_pelanggan
from app.customers.schemas import requestCustomers

from sqlalchemy.orm import Session
from app.database.connection import get_db
router_customers = APIRouter(prefix="/customers")


@router_customers.post("/input_customers")
def input_customers(db: Session=Depends(get_db), data= requestCustomers):
    try:
        result_input_data_customers = get_insert_pelanggan(db, data.id_paket, data.nama_pelanggan, data.nama_paket, data.asal_pengiriman, data.pengiriman,data.jumlah_paket, data.harga_paket)

        return result_input_data_customers
    
    except Exception as e:
        print("terjadi error pada penginputan data customers", e)

@router_customers.get("/all")
def get_all_data(db: Session=Depends(get_db)):
    try:
        result_get_data_pelanggan = get_data_all_pelanggan(db) or []
        
        print("ini data dari pelanggan", result_get_data_pelanggan)
        
        return [row for row in result_get_data_pelanggan]
    except Exception as e:
        raise HTTPException(status_code=404, detail=(e))