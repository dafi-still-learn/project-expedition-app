from fastapi import APIRouter, Depends, Query
import psycopg2 as ps
from psycopg2.extras import RealDictCursor

router_wilayah = APIRouter(prefix="/wilayah")

# MEMUNCULKAN ATAU MEREKOMENDASIKAN WILAYAH BERDASARKAN NAMA WILAYAH YANG DIINGINKAN USER

def get_db():
    return  ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")

@router_wilayah.get("/search")
def get_rekomendasi_nama_wilayah(q: str = Query(..., min_length=1),db=Depends(get_db)):
    try:
        cursor = db.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
        SELECT id, kode_wilayah, nama_wilayah, type_wilayah, lat_wilayah, long_wilayah
        FROM tmp_wilayah
        WHERE nama_wilayah ILIKE %s
        ORDER BY
           CASE
              WHEN nama_wilayah ILIKE %s THEN 1 --PRIORITAS AWALAN KATA KUNCI
              
              ELSE 2
            END,
            nama_wilayah ASC
        LIMIT 10; --MEMBATASI 10 SAJA
        """, (f"%{q}%", f"{q}%"))
        
        hasil = cursor.fetchall()
        return {"status": "success", "data": hasil}
    
    except ps.Error as e:
        return {"status": "error", "message": str(e)}
    
    finally:
        db.close()
        
    