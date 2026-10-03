import psycopg2 as ps
import pandas as pd


def membuat_database_paket():
    conn = ps.connect(dbname="packet", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")
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
            jalur_pengiriman VARCHAR(255)
        )
        """)

        print("DATABASE PAKET BERHASIL DIBUAT")
        conn.commit()

    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()


def input_database_paket(nama_paket, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman):
    conn = ps.connect(dbname="packet", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO paket(nama_paket, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman)
        VALUES(%s, %s, %s, %s, %s, %s, %s) 
        """, (nama_paket, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman))

        conn.commit()

        return True
    except ps.Error as e:
        print(e)
        conn.rollback()
        return False

    finally:
        conn.close()


def tampilkan_database_paket():
    conn = ps.connect(dbname="packet", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        SELECT * FROM paket               
        """)

        data = cursor.fetchall()

        df = pd.DataFrame(
            data, columns=["id", "nama_paket", "jenis_paket", "jumlah_paket", "asal_paket", "tujuan_paket", "berat_paket", "jalur_pengiriman"])

        print(df)

    except ps.Error as e:
        print(e)
        conn.rollback()

    finally:
        conn.close()
