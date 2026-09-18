import psycopg2 as ps

def membuat_database_user():
    conn = ps.connect(dbname="account_user", user="postgres", password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS akun(
        id SERIAL PRIMARY KEY,
        email VARCHAR(100),
        username VARCHAR(50),
        password VARCHAR(50))
        """)
        
        print("database berhasil di buat")

        conn.commit()
    except Exception as e:
        conn.rollback()
        print(e)
        
    finally:
        conn.close()


def tampilkan_tabel_user():
    conn = ps.connect(dbname="account_user", user="postgres", password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT * FROM akun
        """)
        
        data = cursor.fetchall()
        
        print(data)

    except Exception as e:
        print(e)
        conn.rollback()
        
    finally:
        conn.close
        

# DITAMBAHKAN ATAU DIGUNKAN PADA FORM REGISTER KHUSUS NYA PADA BUTTON NYA, AKAN MEMBERI PENGINGAT JIKA KOSONG
def input_tabel_user(email, username, password):
    conn = ps.connect(dbname="account_user", user="postgres", password="Jakgeyye123!@#", host="localhost", port="5432")

    
    try:
        cursor = conn.cursor()
        
        if email == "" or username == "" or password == "":
                    print("ISI REGISTRASI DENGAN BENAR")
                    return False
            
        cursor.execute("""
        INSERT INTO akun(email, username, password)
        VALUES(%s, %s, %s)               
        """,(email, username, password))
        
        print("data bershasil di tambahkan")
        
        conn.commit()
        
        return True
    except Exception as e:
        print(e)
        conn.rollback()
        
    finally:
        conn.close()


# DITAMBAHKAN PADA FORM LOGIN, MEMVALIDASI DATA JIKA SAAT INGIN DIMASUKKAN PADA LOGIN DAN PEMATIKANYA PADA BUTTON FORM LOGIN
def validate_akun_register(email, username):
    conn = ps.connect(dbname="account_user", user="postgres", password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT email
        FROM akun
        WHERE email = %s or WHERE username = %s    
        """, (email, username))
        
        user = cursor.fetchone()
        
        if user is not None:
            return True
        
        return False
    except Exception as e:
        print(e)
        conn.rollback()
        
    finally:
        conn.close()
        
# MELAKUKAN VALIDASI PADA FORM LOGIN, AKAN MERESPON KETIKA DATA YANG DIMASUKKAN ITU TIDAK ADA
def validate_akun_login(username, password):
    conn = ps.connect(dbname="account_user", user="postgres", password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT username
        FROM akun
        WHERE username = %s
        """, (username,))
        
        user = cursor.fetchone()
        
        if user is None:
            return False
        
        if user[1] != password:
            return False
        
        conn.commit()
        return {
            'user_id': user[0],
            'success': True
        }
    except Exception as e:
        print(e)
        conn.rollback()
        
    finally:
        conn.close()
        