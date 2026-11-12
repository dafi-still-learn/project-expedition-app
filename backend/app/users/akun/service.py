import psycopg2 as ps
import pandas as pd
from app.auth.security import hash_password

from sqlalchemy import select
from sqlalchemy.orm import Session
from app.users.akun.models import Akun

# DITAMBAHKAN ATAU DIGUNKAN PADA FORM REGISTER KHUSUS NYA PADA BUTTON NYA, AKAN MEMBERI PENGINGAT JIKA KOSONG
def input_tabel_user(db: Session, email, username, password, role):
    akun = Akun(email=email, username=username, password=password, role=role)
    
    db.add(akun)
    db.refresh(akun)
    db.commit()
   
    return True
# DITAMBAHKAN PADA FORM LOGIN, MEMVALIDASI DATA JIKA SAAT INGIN DIMASUKKAN PADA LOGIN DAN PEMATIKANYA PADA BUTTON FORM LOGIN
def validate_akun_register(db: Session, email, username):
    rows = db.execute(select(Akun.email == email, Akun.username == username)).mappings().one()
    
    if rows is None:
        return False


# MELAKUKAN VALIDASI PADA FORM LOGIN, AKAN MERESPON KETIKA DATA YANG DIMASUKKAN ITU TIDAK ADA


def validate_akun_login(db: Session, username, password):
    rows = db.execute(select(Akun.username == username)).mappings().one()
    
    if rows is None:
        return False
    if rows[2] != password:
        return False
    
    return {
        'user_id': rows[0],
        'success': True
    }

def lupa_password_user(db: Session, email):
    email_akun = db.get(Akun, email)
    if email_akun is None:
        print("404 not found")
        return False
    
    rows = db.execute(select(Akun.email == email_akun)).mappings().one()
    
    return rows

    
        
