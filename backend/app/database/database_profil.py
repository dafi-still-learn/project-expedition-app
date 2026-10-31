import psycopg2 as ps


def membuat_tabel_profil():
    conn = ps.connect(dbname="expedition_db", user="expedition_app",password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS profil(
            id BIGSERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE REFERENCES akun(id),
            email VARCHAR(50) UNIQUE REFERENCES akun(email),
            nama_user VARCHAR(50) UNIQUE,
            nama_panggilan VARCHAR(50) UNIQUE,
            tanggal_lahir_user DATE UNIQUE,
            nomor_hp_user VARCHAR(50) UNIQUE,
            alamat_sekarang VARCHAR(255) UNIQUE,
            penempatan VARCHAR(50) UNIQUE,
            jabatan_sekarang VARCHAR(50) UNIQUE
            )
        """)
        print("database profil selesi di buat")

        conn.commit()
    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()

# membuat_tabel_profil()

def input_user_profil(user_id, email_user, nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        INSERT INTO profil(user_id, email, nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s )
        """, (user_id, email_user, nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang))
                
        conn.commit()
        
        return True
    except ps.Error as e:
        print(e)
        conn.rollback()
        
    finally:
        conn.close()
    
def check_data_profil(user_id):
    conn = ps.connect(dbname="expedition_db", user="expedition_app", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT id, user_id, nama_user, nama_panggilan, tanggal_lahir_user, nomor_hp_user, alamat_sekarang, penempatan, jabatan_sekarang
        FROM profil
        WHERE user_id = %s
        """, (user_id,))
        
        data_user = cursor.fetchone()
        
        if data_user is None:
            print("INI ISI DARI DATA USER PROFIL", data_user)
            return False
        
        return True
    
    except ps.Error as e:
        print("terjadi error pada saat pengecekkan", e)
        
    finally:
        conn.close()
        