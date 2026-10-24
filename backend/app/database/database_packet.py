import psycopg2 as ps


def membuat_database_paket():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS paket(
            id SERIAL PRIMARY KEY,
            nama_paket VARCHAR(255),
            jenis_paket VARCHAR(255),
            jumlah_paket VARCHAR(255),
            asal_paket VARCHAR(255),
            tujuan_paket VARCHAR(255),
            berat_paket VARCHAR(255),
            jalur_pengiriman VARCHAR(255),
            jarak_paket VARCHAR(255),
            harga_pengiriman VARCHAR(255)
        )
        """)

        print("DATABASE PAKET BERHASIL DIBUAT")
        conn.commit()

    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()

membuat_database_paket()

def input_database_paket(nama_paket, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, harga_pengiriman):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO paket(nama_paket, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, harga_pengiriman)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s) 
        """, (nama_paket, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket,  harga_pengiriman))

        conn.commit()

        return True
    except ps.Error as e:
        print(e)
        conn.rollback()
        return False

    finally:
        conn.close()

