import psycopg2 as ps

def membuat_tabel_pelanggan():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS pelanggan(
            id BIGSERIAL PRIMARY KEY UNIQUE,
            id_paket INTEGER REFERENCES paket(id),
            nama_pelanggan VARCHAR(50) REFERENCES paket(nama_pengirim),
            nama_paket VARCHAR(255) REFERENCES paket(nama_paket),
            asal_pengiriman VARCHAR(50) REFERENCES paket(asal_paket),
            tujuan_pengiriman VARCHAR(50) REFERENCES paket(tujuan_paket),
            jumlah_paket INTEGER REFERENCES paket(jumlah_paket),
            harga_paket VARCHAR(255) REFERENCES paket(harga_pengiriman)
        )
        """)

        print("TABEL PAKET SELESAI DIBUAT")
        
        conn.commit()
        
        return True
    except ps.Error as e:
        print("terjadi error pada pembuatan tabel paket", e)
        conn.rollback()
        
    finally:
        conn.close()
        
def input_tabel_customers(id_paket, nama_pelanggan, nama_paket,asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO pelanggan(id_paket, nama_pelanggan, nama_paket, asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket)
        VALUES(%s, %s, %s, %s, %s, %s, %s)
        """, (id_paket, nama_pelanggan, nama_paket,asal_pengiriman, tujuan_pengiriman, jumlah_paket, harga_paket))
        
        print("data paket ditambahkna")
        print("input paket berhasil diisi")

        conn.commit()
        
    except ps.Error as e:
        print("terjadi error pada saat proses penambhakan paket", e)
        
        conn.rollback()
        
    finally:
        conn.close()