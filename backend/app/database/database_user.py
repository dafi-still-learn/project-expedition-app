import psycopg2 as ps
import pandas as pd


def membuat_database_user():
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS akun(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255),
        username VARCHAR(255),
        password VARCHAR(255))
        """)

        print("database berhasil di buat")

        conn.commit()
    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()


def tampilkan_tabel_user():
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        SELECT * FROM akun
        """)

        data = cursor.fetchall()

        df = pd.DataFrame(
            data, columns=['id', 'email', 'username', 'password'])
        print(df)

    except ps.Error as e:
        print(e)
        conn.rollback()

    finally:
        conn.close


# DITAMBAHKAN ATAU DIGUNKAN PADA FORM REGISTER KHUSUS NYA PADA BUTTON NYA, AKAN MEMBERI PENGINGAT JIKA KOSONG
def input_tabel_user(email, username, password):
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        if email == "" or username == "" or password == "":
            print("ISI REGISTRASI DENGAN BENAR")
            return False

        cursor.execute("""
        INSERT INTO akun(email, username, password)
        VALUES(%s, %s, %s)               
        """, (email, username, password))

        print("data bershasil di tambahkan")

        conn.commit()

        return True
    except ps.Error as e:
        print(e)
        conn.rollback()

    finally:
        conn.close()


# DITAMBAHKAN PADA FORM LOGIN, MEMVALIDASI DATA JIKA SAAT INGIN DIMASUKKAN PADA LOGIN DAN PEMATIKANYA PADA BUTTON FORM LOGIN
def validate_akun_register(email, username):
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        SELECT email
        FROM akun
        WHERE email = %s OR username = %s    
        """, (email, username))

        user = cursor.fetchone()

        if user is not None:
            return False

        return True
    except ps.Error as e:
        print(e)
        conn.rollback()

    finally:
        conn.close()

# MELAKUKAN VALIDASI PADA FORM LOGIN, AKAN MERESPON KETIKA DATA YANG DIMASUKKAN ITU TIDAK ADA


def validate_akun_login(username, password):
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        SELECT id, username, password
        FROM akun
        WHERE username = %s
        """, (username,))

        user = cursor.fetchone()

        print("data username validasi", user)
        if user is None:
            return False

        if user[2] != password:
            return False

        conn.commit()
        return {
            'user_id': user[0],
            'success': True
        }
    except ps.Error as e:
        print(e)
        conn.rollback()

    finally:
        conn.close()


def lupa_password_user(email):
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")
    try:
        cursor = conn.cursor()

        cursor.execute("""
        SELECT email
        FROM akun
        WHERE email = %s
        """, (email,))

        data = cursor.fetchone()

        print("DATA EMAIL DARI LUPA PASSWORD", data)
        conn.commit()

    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()


def tampilkan_akun():
    conn = ps.connect(dbname="account_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        SELECT * FROM akun
        """)

        data = cursor.fetchall()

        print("data dari database akun", data)

    except Exception as e:
        print(e)
