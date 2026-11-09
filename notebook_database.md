# Notebook Database: Panduan Lengkap Database Professional untuk Expedition App

## Daftar Isi
1. [Mengapa Database Design Penting](#mengapa-database-design-penting)
2. [Analisis Struktur Database Saat Ini](#analisis-struktur-database-saat-ini)
3. [Masalah Keamanan & Performance](#masalah-keamanan--performance)
4. [Standar Profesional: ORM, Migration, dan Connection Pool](#standar-profesional-orm-migration-dan-connection-pool)
5. [Pemahaman Mendalam tentang Models.py](#pemahaman-mendalam-tentang-modelspy)
6. [Pemahaman tentang __init__.py di Python Package](#pemahaman-tentang-__init__py-di-python-package)
7. [Struktur File Ideal untuk Project](#struktur-file-ideal-untuk-project)
8. [Step-by-Step Refactoring Guide](#step-by-step-refactoring-guide)
9. [Migrasi ke Supabase atau Cloud Database](#migrasi-ke-supabase-atau-cloud-database)
10. [Best Practices & Checklist](#best-practices--checklist)

---

## 1. Mengapa Database Design Penting

Database itu **tulang punggung aplikasi**. Kalau design-nya salah:

- **Data rusak** — bisa insert data yang tidak valid
- **Lambat** — query jalan 10 detik, user kabur
- **Rawan bocor** — hacker bisa inject SQL
- **Tidak bisa dikembangkan** — mau tambah fitur, harus rebuild dari nol

---

## 2. Analisis Struktur Database Saat Ini

```python
# Contoh dari database_packet.py
def input_database_paket(nama_paket, nama_pengirim, jenis_paket, ...):
    conn = ps.connect(
        dbname="expedition_db", 
        user="expedition_app", 
        password="Jakgeyye123!@#",  # ❌ TERLIHAT JELAS DI KODE
        host="localhost", 
        port="5432"
    )
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        INSERT INTO paket(nama_paket, nama_pengirim, ...)
        VALUES(%s, %s, ...)
    """, (nama_paket, nama_pengirim, ...))
    conn.commit()
    conn.close()
```

### 🔴 Masalah Besar:

| Masalah | Konsekuensi | Solusi |
|---|---|---|
| **Password hardcoded** | Password bocor kalau kode di-share, tidak bisa ganti password tanpa edit kode | `.env` file |
| **No connection pool** | Setiap request buka koneksi baru → lambat | SQLAlchemy pool |
| **Raw SQL everywhere** | Typo tidak ketahuan sampai runtime | ORM |
| **No foreign keys** | Data bisa inconsistent | Foreign key constraints |
| **VARCHAR untuk angka/tanggal** | Tidak bisa filter/order yang benar | NUMERIC, TIMESTAMP |

---

## 3. Masalah Keamanan & Performance

### ❌ **Keamanan:**
1. **SQL Injection** — meski pakai `%s`, masih bisa salah jika tidak hati-hati
2. **Credential exposure** — password ada di 10+ file
3. **No validation** — database terima apa saja, tidak ada type checking

### ❌ **Performance:**
1. **Connection overhead** — buka-tutup koneksi ≈ 5-10ms per query
2. **No indexes** — `SELECT * FROM paket WHERE nama_pengirim = '...'` → scan semua baris
3. **String untuk angka** — `WHERE harga_pengiriman > '100000'` tidak jalan benar

---

## 4. Standar Profesional: ORM, Migration, dan Connection Pool

### 4.1 ORM (Object-Relational Mapping) — **KENAPA?**

**Tanpa ORM (sekarang):**
```python
# Kamu tulis:
cursor.execute("INSERT INTO paket(nama_paket) VALUES(%s)", ("Paket A",))
```

**Dengan ORM:**
```python
# Kamu tulis:
paket = Paket(nama_paket="Paket A")
db.add(paket)
db.commit()
```

**Apa kelebihannya?**

| ORM | Raw SQL |
|---|---|
| Type-safe (typem langsung error) | Typo baru ketahuan saat runtime |
| Python objects (OOP) | Raw strings |
| Automatic parameter escaping | Manual (`%s`) |
| Relations as object properties | Join manual |
| Database-agnostic (ganti MySQL/PostgreSQL mudah) | Vendor-specific SQL |

### 4.2 Alembic Migration — **KENAPA?**

**Tanpa migration:**
```python
# Kamu buat function:
def membuat_tabel_pelanggan():
    cursor.execute("CREATE TABLE IF NOT EXISTS pelanggan(...)")
```

Masalah:
- Tidak tahu versi schema sekarang apa
- Tidak bisa rollback kalau salah
- Tidak bisa deploy ke production lain yang perlu schema sama

**Dengan Alembic:**
```bash
# Buat migration
alembic revision --autogenerate -m "add pelanggan table"

# Terapkan
alembic upgrade head

# Rollback
alembic downgrade -1
```

Alembic seperti **Git untuk database**: version control schema.

### 4.3 Connection Pool — **KENAPA?**

**Tanpa pool:**
```
User request 1 → buka koneksi 1 → query → tutup
User request 2 → buka koneksi 2 → query → tutup  
User request 100 → buka koneksi 100 → crash!
```

**Dengan pool:**
```
Pool: [koneksi1, koneksi2, koneksi3, ... koneksi10]

User request 1 → ambil koneksi1 dari pool → query → kembalikan ke pool
User request 2 → ambil koneksi1 (yg sudah ada) → query → kembalikan
```

**Hasil:** 10x lebih cepat, scalable ke ratusan user.

---

## 5. Pemahaman Mendalam tentang Models.py

### **Apa itu Models.py?**

Models.py adalah **definisi struktur tabel** dalam bahasa Python. Ini kontrak antara Python dan PostgreSQL.

**Contoh: Paket Models**

```python
# models/paket.py
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base  # Base = declarative_base()

class Paket(Base):
    __tablename__ = "paket"  # nama tabel di database
    
    # Kolom-kolom
    id = Column(Integer, primary_key=True, index=True)
    nama_paket = Column(String(255), nullable=False)
    nama_pengirim = Column(String(255), nullable=False)
    harga_pengiriman = Column(Numeric(12, 2))  # NUMERIC(12, 2)
    tanggal_pengiriman = Column(DateTime(timezone=True))  # TIMESTAMP WITH TIMEZONE
    
    # Relationships (foreign key)
    resi = relationship("ResiPaket", back_populates="paket", cascade="all, delete")
    
    # Method/Property tambahan
    @property
    def harga_formatted(self):
        return f"Rp{self.harga_pengiriman:,.2f}"
```

### **Apa yang bisa kamu lakukan dengan model ini?**

```python
# CREATE
paket_baru = Paket(
    nama_paket="Elektronik",
    nama_pengirim="Budi",
    harga_pengiriman=500000,
    tanggal_pengiriman=datetime.now()
)
db.add(paket_baru)
db.commit()

# READ
paket = db.query(Paket).filter(Paket.nama_pengirim == "Budi").first()
print(paket.harga_formatted)  # "Rp500,000.00"

# UPDATE
paket.harga_pengiriman = 550000
db.commit()

# DELETE
db.delete(paket)
db.commit()
```

### **Relationships: Kunci Power ORM**

```python
# models/resi_paket.py
class ResiPaket(Base):
    __tablename__ = "resi_paket"
    
    id = Column(Integer, primary_key=True)
    id_paket = Column(Integer, ForeignKey("paket.id", ondelete="CASCADE"))
    nomor_resi = Column(String(100), unique=True)
    
    # Relationship ke Paket
    paket = relationship("Paket", back_populates="resi")

# Sekarang kamu bisa:
paket = db.query(Paket).first()
print(paket.resi.nomor_resi)  # akses resi paket langsung

resi = db.query(ResiPaket).first()  
print(resi.paket.nama_pengirim)  # akses pemilik resi
```

**Foreign key** tidak hanya di database, tapi juga di Python sebagai object property.

---

## 6. Pemahaman tentang __init__.py di Python Package

### **Apa itu `__init__.py`?**

`__init__.py` membuat folder menjadi **Python package**. Isinya kosong atau berisi import untuk memudahkan akses.

**Contoh struktur tanpa `__init__.py`:**
```python
from app.models.paket import Paket
from app.models.pelanggan import Pelanggan
from app.models.resi_paket import ResiPaket
```

**Contoh struktur dengan `__init__.py`:**
```python
# app/models/__init__.py
from .paket import Paket
from .pelanggan import Pelanggan
from .resi_paket import ResiPaket

# __all__ menentukan apa yang diexport
__all__ = ["Paket", "Pelanggan", "ResiPaket"]
```

Sekarang di file lain:
```python
from app.models import Paket, Pelanggan  # lebih rapi!
```

### **Kenapa perlu?**
1. **Organization** — semua model di satu tempat
2. **Import convenience** — tidak perlu ingat path file individual
3. **Initialization** — bisa jalankan setup code saat package di-load

---

## 7. Struktur File Ideal untuk Project

```
backend/
├── .env                          # ENVIRONMENT VARIABLES (JANGAN DI-COMMIT!)
├── .gitignore                    # Include .env, __pycache__, etc.
├── alembic/                      # MIGRATION FILES (Git untuk database)
│   ├── versions/                 # Setiap perubahan schema ada file-nya
│   │   ├── 001_create_tables.py
│   │   └── 002_add_email_column.py
│   └── alembic.ini              # Config
├── app/
│   ├── __init__.py              # App package
│   ├── main.py                  # FastAPI app entry point
│   ├── database.py              # Database connection setup
│   ├── models/                  # SQLAlchemy MODELS
│   │   ├── __init__.py          # Export semua model
│   │   ├── paket.py
│   │   ├── pelanggan.py
│   │   └── resi_paket.py
│   ├── schemas/                 # Pydantic SCHEMAS (request/response validation)
│   │   ├── __init__.py
│   │   ├── paket.py
│   │   └── pelanggan.py
│   ├── crud/                    # CRUD OPERATIONS (Create, Read, Update, Delete)
│   │   ├── __init__.py
│   │   ├── paket.py
│   │   └── pelanggan.py
│   ├── routers/                 # FASTAPI ROUTES
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── paket.py             # /packet endpoints
│   │   └── pelanggan.py
│   └── utils/                   # UTILITIES
│       ├── __init__.py
│       ├── security.py          # password hashing, JWT
│       └── logger.py            # logging setup
└── requirements.txt             # Dependencies
```

### **Alur Data:**

```
User → [routers/] → [schemas/] → [crud/] → [models/] → [database.py] → PostgreSQL
```

1. **User** request ke `/packet/`
2. **Router** (`routers/paket.py`) terima request
3. **Schema** (`schemas/paket.py`) validasi input
4. **CRUD** (`crud/paket.py`) operasi database  
5. **Model** (`models/paket.py`) representasi tabel
6. **Database** (`database.py`) connection ke PostgreSQL
7. **Response** kembali ke user

---

## 8. Step-by-Step Refactoring Guide

### **Phase 1: Keamanan Dasar (1-2 jam)**

1. **Buat `.env` file:**
```
DATABASE_URL=postgresql://expedition_app:Jakgeyye123!@#@localhost:5432/expedition_db
JWT_SECRET_KEY=your-super-secret-jwt-key-here
```

2. **Install dependencies:**
```bash
pip install python-dotenv sqlalchemy psycopg2-binary alembic pydantic
```

3. **Buat `database.py`:**
```python
# app/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()  # Load .env

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, pool_size=10, max_overflow=20)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

### **Phase 2: SQLAlchemy Models (2-3 jam)**

1. **Buat `models/` folder dan `models/paket.py`:**
```python
# app/models/paket.py
from sqlalchemy import Column, Integer, String, Numeric, DateTime
from database import Base

class Paket(Base):
    __tablename__ = "paket"
    
    id = Column(Integer, primary_key=True, index=True)
    nama_paket = Column(String(255), nullable=False)
    nama_pengirim = Column(String(255), nullable=False)
    jenis_paket = Column(String(100))
    jumlah_paket = Column(Numeric(10, 2))
    asal_paket = Column(String(255))
    tujuan_paket = Column(String(255))
    berat_paket = Column(Numeric(10, 2))
    jalur_pengiriman = Column(String(100))
    jarak_paket = Column(Numeric(10, 2))
    nomor_hp_pengirim = Column(String(50))
    nomor_hp_penerima = Column(String(50))
    tanggal_pengiriman = Column(DateTime)
    tanggal_sampai = Column(DateTime)
    harga_pengiriman = Column(Numeric(12, 2))  # NUMERIC bukan VARCHAR
```

2. **Buat `models/__init__.py`:**
```python
from .paket import Paket

__all__ = ["Paket"]
```

3. **Setup Alembic migration:**
```bash
alembic init alembic
alembic revision --autogenerate -m "Initial tables"
alembic upgrade head
```

### **Phase 3: CRUD Operations (2-3 jam)**

1. **Buat `crud/paket.py`:**
```python
from sqlalchemy.orm import Session
from models.paket import Paket

def create_paket(db: Session, paket_data: dict):
    paket = Paket(**paket_data)
    db.add(paket)
    db.commit()
    db.refresh(paket)
    return paket

def get_all_paket(db: Session):
    return db.query(Paket).all()

def get_paket_by_id(db: Session, paket_id: int):
    return db.query(Paket).filter(Paket.id == paket_id).first()
```

### **Phase 4: FastAPI Routers (2-3 jam)**

1. **Buat `routers/paket.py`:**
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import paket as crud_paket
from schemas.paket import PaketCreate, PaketResponse

router = APIRouter(prefix="/packet")

@router.post("/", response_model=PaketResponse)
def create_paket(paket: PaketCreate, db: Session = Depends(get_db)):
    return crud_paket.create_paket(db, paket.dict())

@router.get("/all", response_model=list[PaketResponse])
def get_all_paket(db: Session = Depends(get_db)):
    return crud_paket.get_all_paket(db)
```

### **Phase 5: Pydantic Schemas (1-2 jam)**

1. **Buat `schemas/paket.py`:**
```python
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class PaketBase(BaseModel):
    nama_paket: str
    nama_pengirim: str
    jenis_paket: str
    jumlah_paket: float
    asal_paket: str
    tujuan_paket: str
    berat_paket: float
    harga_pengiriman: float

class PaketCreate(PaketBase):
    pass

class PaketResponse(PaketBase):
    id: int
    tanggal_pengiriman: Optional[datetime]
    
    class Config:
        orm_mode = True  # supaya bisa return SQLAlchemy object
```

---

## 9. Migrasi ke Supabase atau Cloud Database

### **Apa itu Supabase?**
Supabase = PostgreSQL + Auth + Storage + Realtime, di-hosting.

### **Langkah Migrasi:**

1. **Export data dari lokal:**
```bash
pg_dump -U expedition_app -h localhost -d expedition_db > backup.sql
```

2. **Import ke Supabase:**
   - Login ke supabase.com
   - Create project baru
   - Di Dashboard → SQL Editor → paste backup.sql
   - Run

3. **Update `.env`:**
```
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

4. **Test connection** dengan kode yang sama.

### **Keuntungan Supabase:**
- Tidak perlu manage server
- Backup otomatis
- Monitoring
- Bisa scale kalau traffic naik

---

## 10. Best Practices & Checklist

### ✅ **Keamanan:**
- [ ] Password di `.env`, jangan di kode
- [ ] `.env` di `.gitignore`
- [ ] Gunakan parameterized queries (SQLAlchemy sudah otomatis)
- [ ] Validasi input dengan Pydantic
- [ ] Hash password (bcrypt), jangan simpan plain text

### ✅ **Performance:**
- [ ] Connection pool (SQLAlchemy pool_size=10)
- [ ] Index untuk kolom yang sering di-query (`primary_key=True, index=True`)
- [ ] Tipe data tepat (NUMERIC untuk angka, TIMESTAMP untuk tanggal)
- [ ] Pagination untuk data banyak (`LIMIT 50 OFFSET 0`)

### ✅ **Maintainability:**
- [ ] Pakai ORM (SQLAlchemy)
- [ ] Pakai migration (Alembic)
- [ ] Separation of concerns (models, schemas, crud, routers)
- [ ] Logging untuk debugging
- [ ] Error handling dengan try/except

### ✅ **Data Integrity:**
- [ ] Foreign key constraints
- [ ] NOT NULL untuk kolom wajib
- [ ] UNIQUE untuk data yang tidak boleh duplikat
- [ ] Default values kalau perlu
- [ ] Cascade delete untuk relations

---

## Tips untuk Kamu yang Sedang Belajar

1. **Jangan refactor semua sekaligus** — mulai dari satu tabel (paket), setelah jalan, baru tabel berikutnya (pelanggan).

2. **Backup database sebelum perubahan besar:**
```bash
pg_dump expedition_db > backup_before_orm.sql
```

3. **Test incremental** — setelah buat model, test create 1 record, read, update, delete.

4. **Gunakan debugger** atau `print()` untuk lihat apa yang terjadi.

5. **Dokumentasi** — tulis di `README.md` bagaimana setup database.

Database adalah investasi jangka panjang. 1-2 minggu belajar ORM dan migration akan hemat waktu berbulan-bulan ke depan.

---

**Ingat:** Tidak ada yang langsung sempurna. Bahkan startup unicorn pun dulu mulai dengan kode sederhana. Yang penting **selangkah lebih baik dari kemarin**.

---

## 11. SQLAlchemy yang Sering Dipakai: Modul, Method, dan Session

Bagian ini menambah materi belajar. Materi di atas tidak diubah. Contoh di bawah memakai tabel `paket` supaya nyambung dengan kode yang sudah ada di proyek ini.

### 11.1 Peta modul SQLAlchemy

SQLAlchemy punya dua lapisan:

| Lapisan | Nama | Kegunaan |
|---|---|---|
| Core | `sqlalchemy` | Engine, connection, SQL expression, metadata |
| ORM | `sqlalchemy.orm` | Class Python yang mewakili baris tabel, plus `Session` |

Modul dan class yang paling sering dipakai:

| Yang di-import | Dari mana | Fungsi |
|---|---|---|
| `create_engine` | `sqlalchemy` | Membuat engine: pengelola koneksi ke PostgreSQL |
| `text` | `sqlalchemy` | Menjalankan SQL mentah dengan parameter aman |
| `select`, `insert`, `update`, `delete` | `sqlalchemy` | Membangun perintah SQL tanpa menulis string mentah |
| `Column`, `Integer`, `String`, `Numeric`, `DateTime`, `ForeignKey` | `sqlalchemy` | Mendefinisikan kolom di class model |
| `declarative_base` atau `DeclarativeBase` | `sqlalchemy.orm` | Induk semua class model |
| `sessionmaker` | `sqlalchemy.orm` | Pabrik yang menghasilkan object `Session` |
| `Session` | `sqlalchemy.orm` | Satu unit kerja: baca, tambah, ubah, hapus, lalu commit |
| `relationship` | `sqlalchemy.orm` | Menghubungkan model, misalnya `Paket` ke `ResiPaket` |

Contoh import yang dipakai berulang:

```python
from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker, Session
```

### 11.2 Empat benda yang harus dibedakan

```text
Engine        -> tahu cara terhubung ke database dan menyimpan pool koneksi
SessionLocal  -> resep/pabrik Session, belum terhubung ke satu request
Session (db)  -> satu percakapan kerja untuk satu request
Model (Paket) -> gambaran satu baris di tabel paket
```

`create_engine()` **tidak** membuka 10 koneksi sekaligus. Ia menyiapkan pool. Koneksi baru diambil saat `Session` benar-benar butuh query.

```python
engine = create_engine(
    DATABASE_URL,
    pool_size=10,      # koneksi yang disimpan siap pakai
    max_overflow=20,   # tambahan sementara saat ramai
    pool_pre_ping=True # cek koneksi mati sebelum dipakai
)
```

### 11.3 Method Session yang paling sering

`db` di contoh berikut bertipe `Session`.

| Method | Apa yang terjadi | Apakah langsung ke database? |
|---|---|---|
| `add(obj)` | Masukkan object baru ke antrean insert | Belum |
| `add_all([a, b])` | Masukkan banyak object sekaligus | Belum |
| `delete(obj)` | Tandai object untuk dihapus | Belum |
| `flush()` | Kirim SQL yang tertunda, tapi transaksi masih terbuka | Ya, tanpa commit |
| `commit()` | Simpan permanen semua perubahan dalam transaksi ini | Ya |
| `rollback()` | Batalkan semua perubahan sejak transaksi dimulai | Ya |
| `refresh(obj)` | Baca ulang object dari database setelah insert/update | Ya |
| `get(Model, id)` | Ambil satu baris lewat primary key | Ya |
| `execute(stmt)` | Jalankan `select`, `update`, `delete`, atau `text()` | Ya |
| `scalars(stmt)` | Sama seperti execute, lalu ambil object modelnya saja | Ya |
| `close()` | Kembalikan koneksi ke pool | Menutup session, bukan mematikan database |
| `expunge(obj)` | Lepaskan object dari pengawasan Session | Tidak |
| `merge(obj)` | Masukkan object yang sebelumnya terlepas kembali ke Session | Bisa |

Perubahan Python **belum tentu** sudah tersimpan:

```text
db.add(paket)     -> masih di memori Python
db.flush()        -> SQL INSERT terkirim, id bisa sudah terisi, tapi bisa di-rollback
db.commit()       -> baru benar-benar tersimpan
db.rollback()     -> insert/update/delete dalam transaksi itu dibatalkan
```

Kalau ada error di tengah jalan, panggil `rollback()` sebelum menutup session. Kalau tidak, session bisa tetap dalam keadaan gagal dan query berikutnya ditolak.

### 11.4 Apa arti class Session

`Session` adalah **unit of work**, bukan koneksi itu sendiri dan bukan tabel.

Artinya:

1. Session mengawasi object Python yang kamu baca atau ubah.
2. Saat sebuah field object berubah, Session mencatat "baris ini kotor dan perlu di-UPDATE".
3. Semua operasi itu masuk satu transaksi.
4. `commit()` menyimpan semuanya bersama-sama.
5. `rollback()` membatalkan semuanya bersama-sama.
6. Setelah selesai, `close()` mengembalikan koneksi ke pool supaya request lain bisa memakainya.

Ini bedanya dengan kode sekarang. Di `database_packet.py`, satu fungsi membuka `ps.connect()`, membuat cursor, menjalankan SQL, lalu `commit()` dan `close()`. Di `router.py` wilayah, `get_db()` juga langsung mengembalikan koneksi psycopg2. Session menggantikan pola buka-tutup itu dengan satu object yang bisa dipakai untuk banyak operasi dalam satu transaksi.

Contoh: menyimpan paket dan resi harus sama-sama berhasil.

```python
def simpan_paket_dan_resi(db: Session, data: dict, nomor_resi: str):
    try:
        paket = Paket(**data)
        db.add(paket)
        db.flush()  # paket.id sudah ada, transaksi belum ditutup

        resi = ResiPaket(id_paket=paket.id, nomor_resi=nomor_resi)
        db.add(resi)

        db.commit()      # paket dan resi tersimpan bersama
        db.refresh(paket)
        return paket
    except Exception:
        db.rollback()    # kalau resi gagal, paket juga ikut batal
        raise
```

Kalau keduanya memakai koneksi dan `commit()` yang berbeda, bisa terjadi paket sudah tersimpan tetapi resinya gagal. Satu Session menjaga keduanya dalam satu transaksi.

### 11.5 Create, Read, Update, Delete

Model yang dipakai contoh:

```python
class Base(DeclarativeBase):
    pass

class Paket(Base):
    __tablename__ = "paket"

    id: Mapped[int] = mapped_column(primary_key=True)
    nama_paket: Mapped[str] = mapped_column(String(255))
    nama_pengirim: Mapped[str] = mapped_column(String(255))
    harga_pengiriman: Mapped[float] = mapped_column(Numeric(12, 2))
```

#### Insert satu data

```python
paket = Paket(
    nama_paket="Elektronik",
    nama_pengirim="Budi",
    harga_pengiriman=500000,
)
db.add(paket)
db.commit()
db.refresh(paket)   # mengambil id yang baru dibuat database
print(paket.id)
```

`add()` hanya menandai object. `commit()` yang mengirim `INSERT`. `refresh()` dibutuhkan kalau kamu mau memakai nilai yang dihasilkan database, seperti `id` atau default timestamp.

#### Insert banyak data

```python
db.add_all([
    Paket(nama_paket="Dokumen", nama_pengirim="Ani", harga_pengiriman=25000),
    Paket(nama_paket="Makanan", nama_pengirim="Sari", harga_pengiriman=40000),
])
db.commit()
```

#### Menampilkan satu data

Primary key lebih jelas memakai `get`:

```python
paket = db.get(Paket, 10)
if paket is None:
    raise HTTPException(status_code=404, detail="Paket tidak ditemukan")
```

Filter selain primary key memakai `select`:

```python
stmt = select(Paket).where(Paket.nama_pengirim == "Budi")
paket = db.scalars(stmt).first()      # satu object atau None
```

#### Menampilkan semua data yang diinginkan

```python
stmt = (
    select(Paket)
    .where(Paket.nama_pengirim.ilike("%budi%"))
    .order_by(Paket.id.desc())
    .limit(50)
    .offset(0)
)
semua = db.scalars(stmt).all()
```

| Method hasil | Hasil |
|---|---|
| `.first()` | Object pertama atau `None` |
| `.one()` | Tepat satu; error kalau kosong atau lebih dari satu |
| `.one_or_none()` | Satu atau `None`; error kalau lebih dari satu |
| `.all()` | List, bisa kosong |

Jangan memakai `.all()` untuk tabel yang bisa tumbuh besar tanpa `limit`. Untuk laporan, hitung total terpisah lalu kirim data per halaman.

#### Update

Cara ORM: ambil object, ubah atributnya, lalu commit. Session mengetahui perubahannya.

```python
paket = db.get(Paket, 10)
if paket is None:
    raise HTTPException(status_code=404, detail="Paket tidak ditemukan")

paket.harga_pengiriman = 550000
db.commit()
db.refresh(paket)
```

Cara ini tidak memerlukan `db.add()` lagi karena object itu sudah berada di dalam Session sejak `db.get()`.

Cara query langsung, tanpa lebih dulu memuat object:

```python
stmt = (
    update(Paket)
    .where(Paket.id == 10)
    .values(harga_pengiriman=550000)
)
hasil = db.execute(stmt)
db.commit()
print(hasil.rowcount)   # jumlah baris yang berubah
```

Pilih cara ORM saat kamu sudah memegang objectnya. Pilih `update()` saat banyak baris diubah sekaligus.

#### Delete

```python
paket = db.get(Paket, 10)
if paket is not None:
    db.delete(paket)
    db.commit()
```

Atau:

```python
stmt = delete(Paket).where(Paket.id == 10)
db.execute(stmt)
db.commit()
```

### 11.6 Di mana Session dipanggil: router, service, atau database?

Jawaban singkatnya: **Session dibuat sekali untuk satu request, biasanya lewat dependency router. Perintah insert, select, dan update tidak ditulis langsung memenuhi router.**

Di proyek ini pembagiannya sekarang begini:

```text
main.py
  -> router_packet.py menerima HTTP
      -> database_packet.py membuka koneksi dan menjalankan SQL
```

Misalnya endpoint `/packet/input_packet` hanya menerima schema `data_pengiriman`, lalu memanggil `input_database_paket(...)`. Router tidak menulis `INSERT` sendiri. Itu pola yang tetap dipertahankan saat pindah ke SQLAlchemy.

Bentuk yang rapi:

```text
Router     -> urusan HTTP: terima request, panggil lapisan bawah, kembalikan response
Service    -> urusan bisnis: harga, resi, pelanggan sudah ada atau belum
CRUD/repo  -> urusan tabel: add, select, update, delete
database.py -> engine, SessionLocal, Base, dan get_db
models.py  -> bentuk tabel dalam class Python
```

`get_db()` boleh dipanggil dari router karena FastAPI yang membuka dan menutupnya:

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()

@router.post("/input_packet")
def input_packet_user(
    data: DataPengiriman,
    db: Session = Depends(get_db),
):
    return paket_service.simpan_paket(db, data)
```

`Depends(get_db)` artinya:

1. FastAPI memanggil `get_db()` sebelum fungsi endpoint berjalan.
2. Object yang di-`yield` masuk ke parameter `db`.
3. Setelah response selesai atau terjadi error, blok `finally` tetap menjalankan `db.close()`.

Fungsi CRUD menerima `db`, bukan membuat Session sendiri:

```python
def create_paket(db: Session, data: dict) -> Paket:
    paket = Paket(**data)
    db.add(paket)
    db.commit()
    db.refresh(paket)
    return paket
```

Jangan buat `SessionLocal()` di dalam setiap fungsi CRUD. Kalau dibuat di sana, setiap fungsi punya transaksi berbeda sehingga `rollback()` di router tidak bisa membatalkan semuanya.

Satu pengecualian adalah script sekali jalan, seperti seed atau perintah CLI. Script tidak punya request FastAPI, jadi ia membuat session sendiri:

```python
with SessionLocal() as db:
    db.add(Paket(...))
    db.commit()
```

### 11.7 Apakah database.py masih diperlukan?

**Masih.** `models.py` dan `database.py` tidak saling menggantikan.

`database.py` menampung infrastruktur koneksi, bukan data paket dan bukan aturan harga:

| Isi database.py | Tugasnya |
|---|---|
| `engine` | Alamat database dan connection pool |
| `SessionLocal` | Cara membuat Session |
| `Base` | Induk class model |
| `get_db()` | Membuka satu Session per request dan selalu menutupnya |

`models.py` menampung bentuk tabel. `crud` atau repository menampung query. Router menampung endpoint. Service menampung aturan bisnis.

Jadi "cukup satu file" bukan tujuan yang tepat. Yang diganti adalah pola **satu koneksi manual di setiap fungsi**. Tetap ada satu pusat koneksi, lalu query tersebar sesuai tanggung jawabnya.

### 11.8 Apakah database.py yang membuat tabel?

Tidak secara otomatis. Ada tiga pekerjaan yang sering tertukar:

| Pekerjaan | Tool yang tepat | Kapan |
|---|---|---|
| Menghubungkan aplikasi ke database | `create_engine` di `database.py` | Setiap aplikasi hidup |
| Mengirim query aplikasi | `Session` | Setiap request |
| Membuat atau mengubah tabel | Alembic migration | Saat schema berubah |

Model hanya menjelaskan keinginan kita. PostgreSQL belum berubah hanya karena class `Paket` disimpan.

`Base.metadata.create_all(bind=engine)` bisa membuat tabel yang belum ada dari semua model. Ini berguna untuk percobaan lokal, tetapi tidak mengubah tabel lama, tidak menghapus kolom lama, dan tidak punya riwayat perubahan. Karena itu untuk aplikasi yang terus berkembang, pembuatan dan perubahan tabel dimiliki Alembic:

```bash
alembic revision --autogenerate -m "buat tabel paket"
alembic upgrade head
```

File migration itulah yang menjadi versi dari `CREATE TABLE`, `ALTER TABLE`, penambahan index, dan penambahan foreign key. `database.py` tetap bertanggung jawab pada koneksi; Alembic bertanggung jawab pada evolusi schema.

### 11.9 Alur lengkap satu request

```text
POST /packet/input_packet
        |
        v
router menerima data_pengiriman
        |
        v
Depends(get_db) membuat Session dari SessionLocal
        |
        v
service menghitung resi / mengecek pelanggan
        |
        v
repository menjalankan db.add(), db.get(), atau select()
        |
        v
db.commit() menyimpan transaksi
        |
        v
router mengubah object menjadi response
        |
        v
get_db() menutup Session di finally
```

Kalau service atau repository melempar error, `rollback()` membatalkan perubahan dan `close()` tetap dipanggil.

### 11.10 Urutan belajar yang aman

1. Pindahkan alamat database ke `.env`, tetapi jangan ubah perilaku endpoint dulu.
2. Buat `database.py` yang hanya berisi engine, `SessionLocal`, `Base`, dan `get_db()`.
3. Buat satu model `Paket` yang sesuai dengan tabel yang sudah ada.
4. Uji `db.get()`, `select().all()`, insert, update, dan rollback pada satu endpoint.
5. Setelah pola itu paham, baru pindahkan fungsi di `database_packet.py` satu per satu.
6. Baru kemudian masukkan Alembic untuk perubahan schema.

Jangan mengganti semua file database sekaligus. Kode sekarang memakai psycopg2 dan masih berjalan sebagai acuan. SQLAlchemy menggantikan cara berbicara dengan database, tetapi pembagian tanggung jawabnya tetap: router menerima request, fungsi database atau repository menjalankan operasi data, dan satu file koneksi mengatur Session.