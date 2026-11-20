from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from app.database.connection import get_db
from app.packet.models import Paket
from datetime import datetime, timedelta

router_delivery = APIRouter(prefix="/pengiriman")

@router_delivery.get("/filter")
def get_data_filter_delivery(nama_pengirim: str | None = Form(None), nama_paket: str | None = Form(None), tipe_paket: str | None = Form(None), asal_kota: str | None = Form(None), tujuan_kota: str | None = Form(None), waktu: int | None = Form(None), db: Session=Depends(get_db)):
    waktu_filter = datetime.now() - timedelta(days=waktu)
    try:
        query = select(Paket)
        kondisi = []
        
        if nama_pengirim:
            kondisi.append(Paket.nama_pengirim == nama_pengirim)
        
        if nama_paket:
            kondisi.append(Paket.nama_paket == nama_paket)
            
        if tipe_paket:
            kondisi.append(Paket.jenis_paket == tipe_paket)
            
        if asal_kota:
            kondisi.append(Paket.asal_paket == asal_kota)
        
        if tujuan_kota:
            kondisi.append(Paket.tujuan_paket == tujuan_kota)
        
        if waktu is not None:
            waktu_filter = datetime.now() - timedelta(days=waktu)
            kondisi.append(Paket.tanggal_pengiriman >= waktu_filter)

        if kondisi:
            query = query.where(and_(*kondisi))
            
        
        hasil = db.execute(query).scalars().all()
        
        print("bentukan data dari filter ", hasil)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=(e))
                        
        