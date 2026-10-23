import psycopg2 as ps


def membuat_tabel_profil():
    conn = ps.connect(dbname="expedition_db", user="expedition_app",password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS profil(
            id INTEGAR PRIMARY,
            user_id INTEGER UNIQUE REFERENCE akun(id)
            email VARCHAR(50) UNIQUE REFERENCE akun(email),
            nama_user VARCHAR(50) UNIQUE,
            nama panggilan VARCHAR(50) UNIQUE,
            tanggal_hari_user VARCHAR(50) UNIQUE,
            nomor_hp_user VARCHAR(50) UNIQUE,
            alamat_sekarang VARCHAR(255) UNIQUE,
            penempatan VARCHAR(50) UNIQUE,
            jabatan_sekarang VARCHAR(50) UNIQUE)
        """)

        conn.commit()
    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()

def input_user_profil(nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO profil(nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang)
        VALUES(%s, %s, %s, %s, %s, %s, %s)
        """, (nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang))
        
        conn.commit()
        
        return True
    except ps.Error as e:
        print(e)
        conn.rollback()
        
    finally:
        conn.close()
    