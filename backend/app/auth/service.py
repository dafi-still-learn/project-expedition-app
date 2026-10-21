# MEMBUAT FITUR YANG BERHUBUNGNA DENGAN TOKEN SEPERTI REFRESH TOKEN DAN VERIFIKASI TOKEN
import psycopg2 as ps
import jwt
from time import time
import re

# dijalankna ketika token access sudah expired, maka akan membuat token baru dengan menggunakan refresh token
# INI BERFUNGSI SEBAGAI TEMPAT PENGECEKKAN ID, MELALUI PEMILHAN ID DARI DATA TOKEN REFRESH
def check_refresh_token(refreh_token, public_key):
    data_token = jwt.decode(refreh_token, public_key, algorithms="RS256")

    if data_token:
        conn = ps.connect(dbname="expedition_db", user="expedition_app",
                              password="Jakgeyye123!@#", host="localhost", port="5432")
        try:
            print(data_token)
            cursor = conn.cursor()

            sub_data = data_token['sub']
            angka_saja = re.findall(r'\d+', str(sub_data))
            
            if not angka_saja:
                print("gagal mengekstrak id sub token")
                return None

            user_angka_murni = int(angka_saja[0])
            
            cursor.execute("""
            SELECT id
            FROM akun
            WHERE id = %s
            """, (user_angka_murni,))

            user = cursor.fetchall()

            # ID DARI USER SUDAH DITEMUKAN, TAPI MASIH BELUM BISA DI AKSES
            # INI AMAN DAN BERJALAN DENGAN BAIK
            print("INI DATA ID DARI REFRESH TOKEN", user)
            if user:
                return user
            else:
                print("data tidak ditemukan")

        except ps.Error as e:
            print(e)
            conn.rollback()

        finally:
            conn.close()


def make_access_token_from_from_refresh(private_key, id_user):
    if isinstance(id_user, list) and len(id_user) > 0:
        user_id_murni = id_user[0][0]
    else:
        user_id_murni = id_user
        
    payload = {
        'sub': str(user_id_murni),
        'iat': time(),
        'type': 'access',
        'exp': time() + 900
    }

    access_token = jwt.encode(payload, private_key, algorithm="RS256")

    return access_token

def make_access_token(private_key):
    data_token = check_refresh_token

    payload = {
        'sub': data_token["user_id"],
        'iat': time(),
        'type': 'access',
        'exp': time() + 900
    }

    access_token = jwt.encode(payload, private_key, algorithm="RS256")

    return access_token

def verify_access_token(access_token, public_key):
    data_token = jwt.decode(access_token, public_key, algorithms="RS256")

    if data_token:
        conn = ps.connect(dbname="expedition_db", user="expedition_app",
                              password="Jakgeyye123!@#", host="localhost", port="5432")
        try:
            cursor = conn.cursor()

            cursor.execute("""
            SELECT user_id
            FROM akun
            WHERE user_id = %s
            """, (data_token['sub']))

            user = cursor.fetchall()

            if user:
                return data_token
            else:
                print("data tidak ditemukan")
        except ps.Error as e:
            print(e)
            conn.rollback()
        finally:
            conn.close()
            
def check_role_user_token(access_token, public_key):
    data_token = jwt.decode(access_token, public_key, algorithms=["RS256"])
    
    if data_token:
        conn = ps.connect(dbname="expedition_db", user="expedition_app",
                                 password="Jakgeyye123!@#", host="localhost", port="5432")
        try:
            cursor = conn.cursor()
   
            cursor.execute("""
            SELECT role
            FROM akun
            WHERE id = %s
            """, (data_token['sub'],))
   
            user = cursor.fetchall()
   
            if user:
                print("ini isi data token", user)
                return {
                    "role_user": user
                }
            else:
                   print("data tidak ditemukan")
        except ps.Error as e:
               print(e)
               conn.rollback()
        finally:
               conn.close()