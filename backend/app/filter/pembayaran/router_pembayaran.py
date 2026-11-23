from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from app.database.connection import get_db
from app.pembayaran.models import Pembayaran
from datetime import datetime, timedelta

router_pembayaran = APIRouter(prefix="/pembayaran")

@router_pembayaran.get("/filter")
def get_data_filter_pelanggan(
    tanggal_pembayaran: str | None = Query(None),
    pihak_pembayaran: str | None = Query(None),
    nominal_pembayaran: str | None = Query(None),
    metode_pembayaran: str | None = Query(None),
    waktu: int | None = Query(None),
    db: Session = Depends(get_db)
):
    try:
        query = select(Pembayaran)
        kondisi = []
        
        if tanggal_pembayaran:
            kondisi.append(Pembayaran.tanggal_pembayaran == tanggal_pembayaran)
        
        if pihak_pembayaran:
            kondisi.append(Pembayaran.pihak_pembayaran == pihak_pembayaran)
            
        if nominal_pembayaran:
            kondisi.append(Pembayaran.nominal_pembayaran == nominal_pembayaran)
        
        if metode_pembayaran:
            kondisi.append(Pembayaran.metode_pembayaran == metode_pembayaran)
        
        if waktu is not None:
            waktu_filter = datetime.now() - timedelta(days=waktu)
            kondisi.append(Pembayaran.tanggal_pembayaran >= waktu_filter)

        if kondisi:
            query = query.where(and_(*kondisi))
            
        hasil = db.execute(query).scalars().all()
        
        print("bentukan data dari filter ", hasil)
        
        return hasil
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
                        
        
