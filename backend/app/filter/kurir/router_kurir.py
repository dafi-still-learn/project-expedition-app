from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from app.database.connection import get_db
from app.kurir.models import Kurir
from datetime import datetime, timedelta

router_kurir = APIRouter(prefix="/kurir")

@router_kurir.get("/filter")
def get_data_filter_pelanggan(
    nama_kurir: str | None = Query(None),
    jalur_kurir: str | None = Query(None),
    daerah_kurir: str | None = Query(None),
    status_kurir: str | None = Query(None),
    rating_kurir: str | None = Query(None),
    alamat_kurir: str | None = Query(None),
    # waktu: int | None = Query(None),
    db: Session = Depends(get_db)
):
    try:
        query = select(Kurir)
        kondisi = []
        
        if nama_kurir:
            kondisi.append(Kurir.nama_kurir == nama_kurir)
        
        if jalur_kurir:
            kondisi.append(Kurir.jalur_kurir == jalur_kurir)
            
        if daerah_kurir:
            kondisi.append(Kurir.daerah_kurir == daerah_kurir)
        if status_kurir:
            kondisi.append(Kurir.status_kurir == status_kurir)
        if rating_kurir: 
            kondisi.append(Kurir.rating_kurir == rating_kurir)
        if status_kurir:
            kondisi.append(Kurir.alamat_kurir == alamat_kurir)
        
        # if waktu is not None:
        #     waktu_filter = datetime.now() - timedelta(days=waktu)
        #     kondisi.append(Kurir.waktu_registrasi_kurir >= waktu_filter)

        if kondisi:
            query = query.where(and_(*kondisi))
            
        hasil = db.execute(query).scalars().all()
        
        print("bentukan data dari filter ", hasil)
        
        return hasil
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
                        
        
