from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, case
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.wilayah.models import Wilayah
router_wilayah = APIRouter(prefix="/wilayah")

# MEMUNCULKAN ATAU MEREKOMENDASIKAN WILAYAH BERDASARKAN NAMA WILAYAH YANG DIINGINKAN USER

@router_wilayah.get("/search")
def get_rekomendasi_nama_wilayah(db: Session = Depends(get_db) ,q: str = Query(..., min_length=1)):
        stmt = (
            select(
                Wilayah.id,
                Wilayah.kode_wilayah,
                Wilayah.nama_wilayah,
                Wilayah.type_wilayah,
                Wilayah.lat_wilayah,
                Wilayah.long_wilayah,
            )
            .where(Wilayah.nama_wilayah.ilike(f"%{q}%"))
            .order_by(
                case((Wilayah.nama_wilayah.ilike(f"{q}%"), 1), else_=2),
                Wilayah.nama_wilayah.asc(),
            )
            .limit(10)
        )
        
        hasil = db.execute(stmt).mappings().all()
    
        print("isi rekomedasi wilayah ", hasil)
        return {"status": "success", "data": hasil}
    
