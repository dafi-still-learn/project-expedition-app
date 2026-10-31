import psycopg2 as ps
import csv

def membuat_tabel_wilayah():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS tmp_wilayah(
            id BIGSERIAL PRIMARY KEY,
            kode_wilayah VARCHAR(5) UNIQUE,
            nama_wilayah VARCHAR(255),
            type_wilayah VARCHAR(10),
            lat_wilayah NUMERIC(10, 7),
            long_wilayah NUMERIC(10, 7),
            status_wilayah VARCHAR(10),
            geom GEOMETRY(POINT, 4326)
        )
        """)

        print("table wilayah berhasil dibuat")
        conn.commit()
    
    except ps.Error as e:
        print("terjadi error pada pembuatan table wilayah ", e)
        conn.rollback()
    
    finally:
        conn.close
        
def import_csv_wilayah(pasth_csv):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        with open(pasth_csv, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            sql = """
            INSERT INTO tmp_wilayah(kode_wilayah, nama_wilayah, type_wilayah, lat_wilayah, long_wilayah, status_wilayah, geom)
            VALUES(%s, %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326))
            ON CONFLICT (kode_wilayah) DO NOTHING;
            """
            
            for row in reader:
                kode = row["serial"]
                nama = row["name"]
                tipe = row["type"]
                lat= row["latitude"]
                long = row["longitude"]
                status = row["status"]
                
                cursor.execute(sql, (kode, nama, tipe, lat, long, status, long, lat))
        
        conn.commit()
        print("csv berhasil di migrasi ke postresql")
        
    except ps.Error as e:
        print("terjadi error pada saat migrasi ke database ", e)
        conn.rollback()
        
    finally:
        conn.close()
        
