from app.database.database_resi_paket import input_tabel_resi_paket
from app.service.generate_nomor_resi import generate_nomor_resi_paket
from app.database.database_customers import input_tabel_customers, check_pelanggan
import psycopg2 as ps


def membuat_database_paket():
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS paket(
            id BIGSERIAL PRIMARY KEY,
            nama_paket VARCHAR(255),
            nama_pengirim VARCHAR(255),
            jenis_paket VARCHAR(255),
            jumlah_paket INTEGER,
            asal_paket VARCHAR(255),
            tujuan_paket VARCHAR(255),
            berat_paket NUMERIC(10, 2),
            jalur_pengiriman VARCHAR(255),
            jarak_paket NUMERIC(10, 2),
            nomor_hp_pengirim VARCHAR(50),
            nomor_hp_penerima VARCHAR(50),
            tanggal_pengiriman DATE,
            tanggal_sampai DATE,
            harga_pengiriman NUMERIC(10, 2)
            )
        """)
        
        print("DATABASE PAKET BERHASIL DIBUAT")
        conn.commit()

    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()

# membuat_database_paket()

def input_database_paket(nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO paket(id, nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s. %s. %s. %s, %s, %s)
        RETURNING id, nama_paket, nama_pengirim, asal_paket, tujuan_paket, jumlah_paket, harga_pengiriman
        """,
        (nama_paket, nama_pengirim, jenis_paket, jumlah_paket, asal_paket, tujuan_paket, berat_paket, jalur_pengiriman, jarak_paket, nomor_hp_pengirim, nomor_hp_penerima, tanggal_pengiriman, tanggal_sampai, harga_pengiriman))

        print("data tabel paket berhasil diisi")
        
        data_id = cursor.fetchone()
                
        # MENGINPUT HASIL DARI NOMOR RESI DAN MENGENERATE HASIL RESI DARI ID PAKET
        hasil_generate_nomor_resi = generate_nomor_resi_paket(data_id["id"])
                
        input_tabel_resi_paket(data_id["id"], data_id["nama_paket"], hasil_generate_nomor_resi["hasil_generate_resi_paket"],hasil_generate_nomor_resi["raw_seed"])
        
        # MELAKUKAN PENGECEKKAN PADA NAMA PELANGGAN DAN NOMOR HP PELANGGAN
        hasil_pengecekkan_pelanggan = check_pelanggan(data_id["nama_pelanggan"], data_id["nomor_hp_pengirim"])
        
        # MENGINPUT HASIL DARI PELANGGAN, JIKA SUDAH ADA TETAP DITAMBAHKAN TAPI DENGAN NAMA YANG SAMA DAN NOMOR HP YANG SAMA YANG DIAMBIL DARI CHECK AKUN PELANGGAN BAGIAN DATABASE PAKET
        if hasil_pengecekkan_pelanggan["success"] == True:
            input_tabel_customers(data_id["id"], data_id["nama_pengirim"], data_id["nomor_hp_pengirim"], data_id["nama_paket"], data_id["asal_paket"], data_id["tujuan_paket"], data_id["jumlah_paket"], data_id["harga_pengiriman"])
            
        elif hasil_pengecekkan_pelanggan["success"] == False:
            print("pelanggan sudah punya akun")
            input_tabel_customers(data_id["id"], hasil_pengecekkan_pelanggan["nama_pelanggan_punya_akun"], hasil_pengecekkan_pelanggan["nomor_hp_sudah_punya"], data_id["nama_paket"], data_id["asal_paket"], data_id["tujuan_paket"], data_id["jumlah_paket"], data_id["harga_pengiriman"])

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
          