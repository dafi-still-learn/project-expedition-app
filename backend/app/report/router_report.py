from fastapi import APIRouter, Depends, HTTPException
from app.database.connection import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.packet.models import Paket
from app.customers.models import Pelanggan

from datetime import datetime, timedelta

router_report = APIRouter(prefix="/laporan")


@router_report.get("/filter")
def get_data_filter_report(topic: str, waktu: int, db: Session=Depends(get_db)):
    
    filter_hari = datetime.now() - timedelta(days=waktu)
    try:
        if topic == "paket":
            rows_data = db.execute(select(Paket.tanggal_pengiriman, Paket.jumlah_paket).order_by(Paket.tanggal_pengiriman.desc()).limit(waktu)).all()
            
            return {
                "jumlah":[r.jumlah_paket for r in rows_data],
                "waktu":[r.tanggal_pengiriman for r in rows_data]
            }
        # ini masih belum selesai
            
        if topic == "pelanggan":
            data_id_pelanggan = db.scalars(select(Pelanggan).where(Pelanggan.id)).all()
            data_waktu_pengiriman = db.execute(select(Paket.tanggal_pengiriman).order_by(Paket.tanggal_pengiriman.desc()).limit(waktu)).all()
            
            return {
                "jumlah":data_id_pelanggan,
                "waktu":data_waktu_pengiriman, 
            }
        
        # sisa nya unit operasional dll, karena belum ada jadi kosongkan    
    
    except Exception as e:
        raise HTTPException(status_code=404 ,detail=(e))
