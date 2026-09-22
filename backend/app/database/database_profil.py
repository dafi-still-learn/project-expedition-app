import psycopg2 as ps


def membuat_database_user():
    conn = ps.connect(dbname="profil_user", user="postgres",
                      password="Jakgeyye123!@#", host="localhost", port="5432")

    try:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS (
            id INTEGAR PRIMARY,
            user_id INTEGER UNIQUE REFERENCE akun(id)
            email VARCHAR(50) UNIQUE,
            nama_user VARCHAR(50) UNIQUE,
            nama panggilan VARCHAR(50) UNIQUE)               
        """)

        conn.commit()
    except ps.Error as e:
        conn.rollback()
        print(e)

    finally:
        conn.close()
