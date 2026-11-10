# Term & Standard Database Guidelines: Expedition App

Dokumen ini berisi ketentuan arsitektur, standar penulisan modul, keamanan, dan pengelolaan database (PostgreSQL) untuk proyek **Project Expedition App**. Panduan ini wajib diikuti untuk menjaga konsistensi, performa, dan keamanan sistem secara profesional.

---

## Daftar Isi
1. [Prinsip Arsitektur: Separation of Concerns](#1-prinsip-arsitektur-separation-of-concerns)
2. [Ketentuan Modul & File Utama](#2-ketentuan-modul--file-utama)
   - [`connection.py` (Infrastructure / Session & Engine Manager)](#connectionpy-infrastructure--session--engine-manager)
   - [`models.py` (Data Models / ORM Definition)](#modelspy-data-models--orm-definition)
   - [`database_*.py` / Repository (Data Access Layer)](#database_py--repository-data-access-layer)
   - [`router_*.py` (Controller / API Endpoint Layer)](#router_py-controller--api-endpoint-layer)
3. [Standar Keamanan Database (Security & Credentials)](#3-standar-keamanan-database-security--credentials)
4. [Ketentuan Penulisan Kode & Pola Transaksi](#4-ketentuan-penulisan-kode--pola-transaksi)
5. [Kekhasan PostgreSQL pada Expedition App](#5-kekhasan-postgresql-pada-expedition-app)
6. [Catatan Portabilitas: PostgreSQL vs Database Lain](#6-catatan-portabilitas-postgresql-vs-database-lain)

---

## 1. Prinsip Arsitektur: Separation of Concerns

Proyek ini memisahkan tanggung jawab kode ke dalam lapisan-lapisan yang jelas agar mudah diuji, dirawat, dan diskalakan:

```
[HTTP Request / Client]
        ↓
   [Router Layer]        (app/packet/router_packet.py)
        ↓
  [Service / Business]   (app/service/logical_transaksi.py)
        ↓
  [Data Access Layer]    (app/database/database_packet.py)
        ↓
[Connection / Infra]     (app/database/connection.py)
        ↓
    [PostgreSQL]
```

- **Router**: Hanya menerima HTTP request, memvalidasi input via Pydantic, memanggil service/database, dan mengembalikan response. **Tidak boleh** ada string SQL di sini.
- **Service**: Berisi logika bisnis (misal kalkulasi jarak, generate nomor resi, validasi aturan bisnis).
- **Data Access Layer (`database_*.py`)**: Berisi query SQL atau query ORM (SQLAlchemy) yang berinteraksi langsung dengan tabel database.
- **Connection**: Mengelola koneksi fisik, environment variables, connection pool, dan siklus hidup sesi database.

---

## 2. Ketentuan Modul & File Utama

### `connection.py` (Infrastructure / Session & Engine Manager)
- **Tugas**: Menjadi satu-satunya pintu gerbang komunikasi fisik dengan database.
- **Aturan**:
  - Semua parameter sensitif (`DB_NAME`, `USER`, `PASSWORD`, `HOST`, `PORT`) wajib diambil dari file `.env` menggunakan `python-dotenv`.
  - Tidak boleh ada hardcoded credential di dalam file ini atau file lainnya.
  - Menyediakan fungsi utilitas tunggal seperti `get_connection()` (Context Manager untuk raw psycopg2) atau `get_db()` (FastAPI Dependency untuk SQLAlchemy Session).

### `models.py` (Data Models / ORM Definition)
- **Tugas**: Menjadi representasi objek Python dari struktur tabel PostgreSQL.
- **Aturan**:
  - Setiap tabel direpresentasikan sebagai kelas Python yang mewarisi `Base` (Declarative Base dari SQLAlchemy).
  - Penamaan tabel (`__tablename__`) harus menggunakan huruf kecil dan konsisten dengan skema database (contoh: `paket`, `akun`, `pelanggan`, `tmp_wilayah`).
  - Definisikan tipe data secara presisi (gunakan `BigInteger`, `Numeric(12,2)`, `DateTime(timezone=True)`, bukan sekadar `String` untuk semua hal).

### `database_*.py` / Repository (Data Access Layer)
- **Tugas**: Kumpulan fungsi CRUD (Create, Read, Update, Delete) yang dikelompokkan berdasarkan domain bisnis (misal `database_packet.py`, `database_user.py`, `database_customers.py`).
- **Aturan**:
  - Setiap fungsi wajib menggunakan *parameterized queries* (`%s` di psycopg2 atau ORM binding) untuk mencegah **SQL Injection**.
  - Wajib menutup kursor dan mengembalikan koneksi ke pool / melakukan rollback jika terjadi error (`try ... except ps.Error ... finally: conn.close()`).

### `router_*.py` (Controller / API Endpoint Layer)
- **Tugas**: Mengekspos endpoint FastAPI dengan prefix yang sesuai (misal `/auth`, `/packet`, `/wilayah`).
- **Aturan**:
  - Menggunakan FastAPI `Depends(get_db)` atau memanggil fungsi dari Data Access Layer.
  - Menangkap exception database dan membungkusnya ke dalam `HTTPException` dengan status code yang tepat (400, 401, 500).

---

## 3. Standar Keamanan Database (Security & Credentials)

1. **Environment Variables (`.env`)**:
   - File `.env` wajib dimasukkan ke dalam `.gitignore` dan tidak boleh di-commit ke repositori git.
   - Sediakan file `.env.example` sebagai templat kosong bagi pengembang lain.
2. **Password Hashing**:
   - Password pengguna tidak boleh disimpan dalam bentuk plaintext. Wajib menggunakan pustaka hashing yang kuat seperti `argon2` (`PasswordHasher`) sebelum disimpan ke tabel `akun`.
3. **Secret & Key Management**:
   - Private key JWT (`private_key.pem`) dan file sensitif lainnya wajib di-exclude via `.gitignore` (`app/auth/keys/*.pem`).
   - Jangan pernah meninggalkan credential uji coba (hardcoded password) di dalam kode sumber production.

---

## 4. Ketentuan Penulisan Kode & Pola Transaksi

1. **Context Manager untuk Koneksi**:
   ```python
   # Contoh standar penulisan pembuka koneksi
   with get_connection() as conn:
       with conn.cursor() as cursor:
           cursor.execute("SELECT ...", (param,))
           result = cursor.fetchall()
   ```
2. **Commit & Rollback Otomatis**:
   - Operasi yang mengubah data (`INSERT`, `UPDATE`, `DELETE`) wajib melakukan `conn.commit()`.
   - Jika terjadi exception, wajib memanggil `conn.rollback()` untuk menjaga integritas data transaksi.
3. **Connection Pooling**:
   - Hindari membuka dan menutup koneksi socket TCP baru pada setiap query secara mentah tanpa pool jika trafik tinggi. Gunakan `ConnectionPool` psycopg2 atau `create_engine` SQLAlchemy dengan parameter `pool_size` dan `pool_pre_ping=True`.

---

## 5. Kekhasan PostgreSQL pada Expedition App

Proyek ini memanfaatkan beberapa fitur spesifik PostgreSQL yang mungkin berbeda jika dipindahkan ke mesin database lain:

- **PostGIS / Spatial Extension**:
  - Tabel `tmp_wilayah` menggunakan kolom tipe `GEOMETRY(POINT, 4326)` untuk menyimpan koordinat lintang/bujur dan mendukung fungsi spasial (`ST_SetSRID`, `ST_MakePoint`).
- **Auto-Increment**:
  - Menggunakan tipe `BIGSERIAL` untuk kunci primer (`PRIMARY KEY`) bertipe integer besar.
- **Cursor Factory**:
  - Menggunakan `cursor_factory=RealDictCursor` dari `psycopg2.extras` agar hasil query dapat diakses langsung sebagai kamus (dictionary) Python, mempermudah serialisasi ke JSON oleh FastAPI.

---

## 6. Catatan Portabilitas: PostgreSQL vs Database Lain

Jika di kemudian hari proyek ini perlu migrasi atau diadaptasi ke database lain (seperti MySQL, SQLite, atau SQL Server), berikut ringkasan persamaan dan perbedaannya:

### Apa yang **SAMA**:
- **Logika Aplikasi & Router**: Endpoint FastAPI, Pydantic schemas, dan struktur router tidak perlu diubah sama sekali.
- **Pola Arsitektur (Separation of Concerns)**: Pembagian folder `connection.py`, `models.py`, dan `database_*.py` tetap berlaku identik.
- **ORM (SQLAlchemy)**: Jika menggunakan SQLAlchemy, perpindahan database bersifat *database-agnostic* (cukup mengganti string koneksi/URL pada engine).

### Apa yang **BERBEDA**:
1. **Connection String & Driver**:
   - *PostgreSQL*: `postgresql+psycopg2://user:pass@host:port/db` (Driver: `psycopg2` atau `asyncpg`)
   - *MySQL*: `mysql+pymysql://user:pass@host:port/db` (Driver: `PyMySQL` atau `mysqlclient`)
   - *SQLite*: `sqlite:///./database.db` (File-based, tidak butuh host/port/password)
2. **Auto-Increment Syntax**:
   - *PostgreSQL*: `BIGSERIAL` atau `GENERATED ALWAYS AS IDENTITY`
   - *MySQL*: `INT AUTO_INCREMENT`
   - *SQLite*: `INTEGER PRIMARY KEY AUTOINCREMENT`
3. **Geospasial (PostGIS)**:
   - *PostgreSQL*: Native support penuh dengan ekstensi **PostGIS** (`GEOMETRY`, `ST_MakePoint`).
   - *MySQL*: Memiliki dukungan spasial dasar (Spatial Data Types), tetapi sintaks fungsinya berbeda (`ST_GeomFromText`).
   - *SQLite*: Memerlukan ekstensi tambahan **Spatialite**, tidak selengkap PostGIS.
4. **Tipe Data Khusus**:
   - PostgreSQL mendukung tipe data bawaan tingkat lanjut seperti `JSONB`, `UUID`, `ARRAY`. Pada database seperti MySQL atau SQLite, tipe data ini biasanya disimpan sebagai `TEXT` atau `JSON` standar dengan dukungan indexing yang lebih terbatas.
