import secrets
import hashlib
from datetime import datetime
import hmac
import time
import psycopg2 as ps
import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

if "SECRETS_KEY_HMAC" not in os.environ:
    raise RuntimeError(
        f"SECRETS_KEY_HMAC tidak ditemukan. Pastikan .env ada di {BASE_DIR / '.env'}"
    )

SECRETS_KEYS_HMAC = bytes.fromhex(os.environ["SECRETS_KEY_HMAC"])

def data_id_paket(nama_packet):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try: 
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT id
        FROM paket
        WHERE nama_paket = %s
        """,(nama_packet, ))
        
        data = cursor.fetchone()
        
        print("ini isi dari data pket", data)
        
        conn.commit()
        
        return data['id']
    except ps.Error as e:
        print("terjadi error pada saat mencari data id paket dari database", e)
        conn.rollback()
        
    finally:
        conn.close()

def generate_nomor_resi_paket(order_id: int, prefix: str = "EXP") -> str:
    raw = f"{order_id}:{time.time_ns()}:{secrets.token_hex(8)}"
    
    raw_bytes = raw.encode("utf-8")
    
    digest = hmac.new(SECRETS_KEYS_HMAC, raw_bytes, hashlib.sha256).hexdigest()
    
    print(f"hasil dari pembuatan nomor resi paket {prefix}{digest[:12].upper()}")
    
    return f"{prefix}{digest[:12].upper()}"
    
    