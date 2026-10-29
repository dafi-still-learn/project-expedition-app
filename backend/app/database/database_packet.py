import psycopg2 as ps


def membuat_database_paket():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS paket(
            id BIGSERIAL PRIMARY KEY,
            nama_paket VARCHAR(255) UNIQUE,
            nama_pengirim VARCHAR(255) UNIQUE,
            jenis_paket VARCHAR(255) UNIQUE,
            jumlah_paket INTEGER UNIQUE,
            asal_paket VARCHAR(255) UNIQUE,
            tujuan_paket VARCHAR(255) UNIQUE,
            berat_paket VARCHAR(255) UNIQUE,
            jalur_pengiriman VARCHAR(255) UNIQUE,
            jarak_paket VARCHAR(255) UNIQUE,
            nomor_hp_pengirim VARCHAR(50) UNIQUE,
            nomor_hp_penerima VARCHAR(50) UNIQUE,
            tanggal_pengiriman DATE UNIQUE,
            tanggal_sampai DATE UNIQUE,
            harga_pengiriman VARCHAR(255) UNIQUE
            ) RETURNING id
        """)
        
        data_id = cursor.fetchone()
        

        print("DATABASE PAKET BERHASIL DIBUAT")
        conn.commit()

    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()

membuat_database_paket()

def input_database_paket(nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman, nomor_resi_paket):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO paket(nama_paket,nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman, nomor_resi_paket)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s. %s. %s. %s, %s, %s) 
        """, (nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman, nomor_resi_paket))

        print("data tabel paket berhasil diisi")

        conn.commit()

        return True
    except ps.Error as e:
        print(e)
        conn.rollback()
        return False

    finally:
        conn.close()

def cari_id_paket(nama_pengirim):
      conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
      
      try:
          cursor = conn.cursor()
          
          cursor.execute("""
            SELECT id
            FROM paket
            WHERE nama_pengirim = %s         
            """, (nama_pengirim, ))
          
          data_pengirim = cursor.fetchone()
          
          return data_pengirim
        
      except ps.Error as e:
          print("terjadi error pada saat melakukn pencarian nama pengirim", e)
          conn.rollback()
          
      finally:
          conn.close()
          