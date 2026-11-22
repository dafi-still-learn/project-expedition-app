from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from app.database.connection import get_db
from app.customers.models import Pelanggan
from datetime import datetime, timedelta

router_pelanggan = APIRouter(prefix="/pelanggan")

@router_pelanggan.get("/filter")
def get_data_filter_pelanggan(
    nama_pengirim: str | None = Query(None),
    nama_paket: str | None = Query(None),
    tipe_paket: str | None = Query(None),
    asal_kota: str | None = Query(None),
    tujuan_kota: str | None = Query(None),
    waktu: int | None = Query(None),
    db: Session = Depends(get_db)
):
    try:
        query = select(Pelanggan)
        kondisi = []
        
        if nama_pengirim:
            kondisi.append(Pelanggan.nama_pengirim == nama_pengirim)
        
        if nama_paket:
            kondisi.append(Pelanggan.nama_paket == nama_paket)
            
        if tipe_paket:
            kondisi.append(Pelanggan.jenis_paket == tipe_paket)
            
        if asal_kota:
            kondisi.append(Pelanggan.asal_paket == asal_kota)
        
        if tujuan_kota:
            kondisi.append(Pelanggan.tujuan_paket == tujuan_kota)
        
        if waktu is not None:
            waktu_filter = datetime.now() - timedelta(days=waktu)
            kondisi.append(Pelanggan.tanggal_pengiriman >= waktu_filter)

        if kondisi:
            query = query.where(and_(*kondisi))
            
        hasil = db.execute(query).scalars().all()
        
        print("bentukan data dari filter ", hasil)
        
        return hasil
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
                        
        
