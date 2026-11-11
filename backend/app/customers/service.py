import psycopg2 as ps
from psycopg2.extras import RealDictCursor
from fastapi import HTTPException
import os
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

if ("DB_NAME" or "USER" or "PASSWORD" or "HOST" or "PORT") not in os.environ:
    raise RuntimeError(
        f"DATA KEAMANAN dari database tidk ditemukan. pastikan penaruhan dan pengambilan data dari .env benar DI {BASE_DIR / 'env'}"
    )

DB_NAME = os.environ["DB_NAME"]
USER = os.environ["USER"]
PASSWORD = os.environ["PASSWORD"]
HOST = os.environ["HOST"]
PORT = os.environ["PORT"]

# def membuat_tabel_pelanggan():
#     conn = ps.connect(dbname=DB_NAME, user=USER, password=PASSWORD, host=HOST, port=PORT)

#     try:
#         cursor = conn.cursor()
        
#         cursor.execute("""
#         CREATE TABLE IF NOT EXISTS pelanggan(
#             id BIGSERIAL PRIMARY KEY UNIQUE,
#             id_paket INTEGER UNIQUE,
#             nama_pelanggan VARCHAR(50),
#             nomor_hp VARCHAR(50),
#             nama_paket VARCHAR(255),
#             asal_pengiriman VARCHAR(50),
#             tujuan_pengiriman VARCHAR(50),
#             jumlah_paket INTEGER,
#             harga_paket VARCHAR(255)
#         )
#         """)

#         print("TABEL PAKET SELESAI DIBUAT")
        
#         conn.commit()
        
#         return True
#     except ps.Error as e:
#         conn.rollback()
#         raise HTTPException(status_code=500, detail=(e))
        
#     finally:
#         conn.close()
        
membuat_tabel_pelanggan()
        
def input_tabel_customers(id_paket, nama_pelanggan, nomor_hp_pelanggan, nama_paket,asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO pelanggan(id_paket, nama_pelanggan, nomor_hp, nama_paket, asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s)
        """, (id_paket, nama_pelanggan,nomor_hp_pelanggan, nama_paket, asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket))
        
        print("data paket ditambahkna")
        print("input paket berhasil diisi")

        conn.commit()
        
    except ps.Error as e:        
        conn.rollback()
        print(e)        
    finally:
        conn.close()

def check_pelanggan(nama_pelanggan, nomor_hp):
        conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
        
        try:
            cursor = conn.cursor()
            
            cursor.execute("""
            SELECT nama_pelanggan, nomor_hp
            FROM pelanggan
            WHERE nama_pelanggan = %s AND nomor_hp = %s           
            """, (nama_pelanggan, nomor_hp, ))
            
            data = cursor.fetchone()
            
            if data is None:
                return{
                    "success": True 
                }
            else:
                return{
                    "success": False,
                    "nama_pelanggan_punya_akun": nama_pelanggan,
                    "nomor_hp_sudah_punya": nomor_hp,
                }
        
        except ps.Error as e:
            conn.rollback()
            print(e)
        finally:
            conn.close
            
def get_data_all_pelanggan():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
        SELECT * FROM pelanggan
        """)
        
        data_all = cursor.fetchall()
        
        
        if not data_all:
            print("gagal ambil")
        else:
            return data_all
        
    except ps.Error as e:
        print("terjadi error pada pengambilan data pelanggan ", e)
        
    finally:
        conn.close()