import psycopg2 as ps

def membuat_database_resi():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS resi_paket(
            id BIGSERIAL PRIMARY KEY,
            id_paket INTEGER REFERENCES paket(id),
            nama_paket VARCHAR(255) REFERENCES paket(nama_paket),
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
        
def input_tabel_resi_paket(paket_id, nama_paket, resi_paket):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO resi_paket(paket_id, nama_paket, nomor_resi_paket, raw_seed)
        VALUES(%s, %s, %s)
        """, (paket_id, nama_paket, resi_paket))
        
        conn.commit()
        return True
    except ps.Error as e:
        print("terjdi error pada saat menginput isi table resi paket", e)
        conn.rollback()
        
    finally:
        conn.close()