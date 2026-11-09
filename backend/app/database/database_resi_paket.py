import psycopg2 as ps
from psycopg2.extras import RealDictCursor

def membuat_database_resi():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS resi_paket(
            id BIGSERIAL PRIMARY KEY,
            id_paket INTEGER UNIQUE,
            nama_paket VARCHAR(255),
            nomor_resi_paket VARCHAR(255) NOT NULL UNIQUE,
            raw_seed VARCHAR(255) NOT NULL UNIQUE
        )
        """)
        
        print("table nomor resi berhasil di buat")
        conn.commit()
        
    except ps.Error as e:
        print("terjadi error pada pembuatan table resi paket", e)
        conn.rollback()
        
    finally:
        conn.close()
        
membuat_database_resi
        
def input_tabel_resi_paket(id_paket, nama_paket, resi_paket, raw):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO resi_paket(id_paket, nama_paket, nomor_resi_paket, raw_seed)
        VALUES(%s, %s, %s, %s)
        """, (id_paket, nama_paket, resi_paket, raw))
        
        print("nomor resi paket berhasil diisi")
        conn.commit()
        return True
    except ps.Error as e:
        print("terjdi error pada saat menginput isi table resi paket", e)
        conn.rollback()
        
    finally:
        conn.close()

def get_data_resi_paket(resi_paket):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
        SELECT id, nama_paket, nomor_resi_paket
        FROM resi_paket
        WHERE nomor_resi_paket = %s
        """, (resi_paket, ))
        
        data = cursor.fetchone()
        
        print(data)
        if not data:
            print("data tidak ditemukan")
        else:
            return data
        
    except ps.Error as e:
        print(e)
        
    finally:
        conn.close()