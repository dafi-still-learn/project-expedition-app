# FILE TEMPAT MENENTUKAN FITUR APA SAJA YANG DIBERIKAN JIKA ROLE TERSEBUT ADMIN ATAU USER
import psycopg2 as ps

# MEMERIKASI DATA DARI DATBASE BERDASARKAN DARI LOGIN SEBELUM MEMBUAT TOKEN
def check_credential_user(username):
    conn = ps.connect(dbname="expedition_db", user="expedition_app",
                              password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()
        
        cursor.execute("""
        SELECT id, username, gmail, password
        FROM akun
        WHERE username = %s
        """, (username))
        
        data = cursor.fetchone()
        
        if(data):
            return True
        
        return False
    
    except Exception as e:
        print("terjadi error pada databse", e)
        conn.rollback()        

    finally:
        conn.close
        
        
    


