# FILE TEMPAT MENENTUKAN FITUR APA SAJA YANG DIBERIKAN JIKA ROLE TERSEBUT ADMIN ATAU USER
import psycopg2 as ps
from psycopg2.extras import RealDictCursor
# MEMERIKASI DATA DARI DATBASE BERDASARKAN DARI LOGIN SEBELUM MEMBUAT TOKEN
def check_credential_user(username):
    conn = ps.connect(dbname="expedition_db", user="expedition_app",
                              password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
        SELECT id, username, email, password
        FROM akun
        WHERE username = %s
        """, (username,))
        
        data = cursor.fetchone()
        
        if(data):
            return {
                "user_id": data['id'],
                "success": True
            }
        
        return False
    
    except Exception as e:
        print("terjadi error pada databse", e)
        conn.rollback()        

    finally:
        conn.close()
        
def check_hash_password(username):
    conn = ps.connect(dbname="expedition_db", user="expedition_app",
                              password="Jakgeyye123!@#", host="localhost", port="5432")
    
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
        SELECT id, email, username, password
        FROM akun
        WHERE username = %s
        """, (username,))
        
        data_password = cursor.fetchone()
        
        print("ini hashing password", data_password['password'])
        if data_password is None:
            return None
                

        return data_password["password"]
    except Exception as e:
        print("terjadi error", e)
        conn.rollback()
        
    finally:
        conn.close()           


print(check_hash_password("dafi2"))
