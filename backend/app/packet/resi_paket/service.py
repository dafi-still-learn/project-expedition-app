from sqlalchemy.orm import Session
from app.packet.models import ResiPaket
from sqlalchemy import select

# import psycopg2 as ps
# from psycopg2.extras import RealDictCursor

        
# def input_tabel_resi_paket(id_paket, nama_paket, resi_paket, raw):
#     conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
#     try:
#         cursor = conn.cursor()
        
#         cursor.execute("""
#         INSERT INTO resi_paket(id_paket, nama_paket, nomor_resi_paket, raw_seed)
#         VALUES(%s, %s, %s, %s)
#         """, (id_paket, nama_paket, resi_paket, raw))
        
#         print("nomor resi paket berhasil diisi")
#         conn.commit()
#         return True
#     except ps.Error as e:
#         print("terjdi error pada saat menginput isi table resi paket", e)
#         conn.rollback()
        
#     finally:
#         conn.close()

def get_data_resi_paket(db: Session, resi_paket):
    rows = db.scalars(select(ResiPaket).where(ResiPaket.nomor_resi_paket == resi_paket)).one()
    
    if rows is None:
        print("404, not found")
    else:
        return rows
    