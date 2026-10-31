from fastapi import APIRouter, Depends, Query
import psycopg2 as ps
from psycopg2.extras import RealDictCursor

router_wilayah = APIRouter(prefix="/wilayah")

def get_db():
    return  ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")

@router_wilayah.get("/all")
def get_rekomendasi_nama_wilayah(db=Depends(get_db)):
    try:
        cursor = db.cursor(cursor_factory=RealDictCursor)
        
        
    