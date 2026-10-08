# MEMBUAT FITUR YANG BERHUBUNGNA DENGAN TOKEN SEPERTI REFRESH TOKEN DAN VERIFIKASI TOKEN
import psycopg2 as ps
import jwt
from time import time


def check_refresh_token(refreh_token, public_key):
    data_token = jwt.decode(refreh_token, public_key, algorithms="RS256")

    if data_token:
        conn = ps.connect(dbname="akun", user="postgres",
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
