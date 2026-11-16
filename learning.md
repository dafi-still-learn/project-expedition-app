# Learning Guide - Expedition App

Catatan ringkas untuk mengingat konsep, alur, dan syntax yang paling sering dipakai di project ini.

## 1. Gambaran Project & Stack
- **Frontend**: React + Vite, migrasi bertahap ke TypeScript, React Router, Axios, Chart.js
- **Backend**: FastAPI (Python), struktur per domain (`auth`, `packet`, `customers`, `users`, `wilayah`)
- **Database**: PostgreSQL, mulai migrasi dari raw SQL ke SQLAlchemy + Alembic
- **Auth**: JWT/access token + refresh flow (cookie/session context), RBAC (`ADMIN`, `OPERATOR`)

## 2. Peta Progres Belajar (saat ini)
**Sudah dikuasai/dipraktikkan:**
- Alur full-stack dasar: UI → API → logic/service → DB → response → UI
- Auth & proteksi route/role di frontend + backend
- CRUD/fitur inti: paket, pelanggan, resi, wilayah, estimasi (jarak/harga/waktu), tracking, barcode, dashboard/chart
- Debugging nyata: mismatch response, render loop React, masalah token/refresh, penyesuaian tipe data

**Sedang diperdalam:**
- Mengingat syntax SQLAlchemy (query/session/relasi/commit-rollback)
- Alur & perintah Alembic migration
- Konsistensi kontrak data (request/response/schema/tipe) antar layer

## 3. Alur Full-Stack yang Harus Diingat
1. **Frontend (event/hook/service)** memanggil API via Axios.
2. **Router FastAPI** menerima request, validasi input/dependency.
3. **Service/logic** proses aturan bisnis (resi, estimasi, dsb).
4. **DB layer/ORM** baca/tulis PostgreSQL.
5. **Response JSON** kembali ke frontend → normalisasi data → update state → render.

## 4. Cheat Sheet Cepat (Prioritas Ingatan)

### Backend / Database (SQLAlchemy + Alembic)
```python
# Dependency session (FastAPI)
db: Session = Depends(get_db)

# Select
stmt = select(Model).where(Model.id == id)
row = db.execute(stmt).scalars().first()      # .all() untuk banyak
rows = db.execute(stmt).scalars().all()

# Insert
obj = Model(field=value)
db.add(obj)
db.commit()
db.refresh(obj)

# Aman saat error (di tempat yang sesuai)
try:
    ...
    db.commit()
except Exception:
    db.rollback()
    raise
```

```bash
# Alembic (ingat urutan: buat -> cek file -> apply)
alembic revision -m "deskripsi"
alembic revision --autogenerate -m "deskripsi"  # jika env/autogen siap
alembic upgrade head
alembic current
alembic history
```

**PostgreSQL (konsep penting):**
- Pakai tipe data tepat (`INTEGER/NUMERIC`, `TIMESTAMP`, dll), bukan semua string.
- Cek relasi/foreign key dan konsistensi schema saat ubah fitur.
- Jika ragu hasil query ORM, verifikasi di pgAdmin/DBeaver.

### Frontend (React + TS + Auth/Data)
```ts
useEffect(() => {
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/packet/all");
      setData(res.data?.data ?? []); // sesuaikan kontrak response
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);
```

**Pola wajib ingat:**
- Jangan asumsi bentuk response: cek `res.data`, `res.data.data`, dll.
- Guard sebelum render/list: `Array.isArray(data)` / `?.` / `??`.
- Auth: token/role harus jelas; hati-hati race condition & dependency hook.
- Chart.js: container/canvas harus punya ukuran jelas agar tidak error render.

## 5. Pola Debugging Singkat
- **Data/DB**: cek tipe kolom vs payload, query langsung di DB, status migration.
- **Backend**: cek schema request, return shape, exception/HTTP status, logic service.
- **Frontend**: cek response aktual, state/loading, dependency `useEffect`, guard data.
- Lihat detail kasus di `debugging.md` dan `frontend/debugging.md`.

## 6. Cara Belajar Hybrid (biar cepat ingat)
- **Harian (10-20 menit)**: catat 1 syntax + 1 alur yang dipakai hari ini.
- **Mini-practice**: coba pola kecil terisolasi (1 query, 1 migration, 1 hook fetch) sebelum ke fitur besar.
- **Review berkala**: baca ulang catatan saat mulai task mirip (auth, paket, chart, migration).
- **Prioritas hafalan**: syntax yang paling sering muncul di project ini dulu, bukan semua API.

## 7. Referensi Cepat
- FastAPI: https://fastapi.tiangolo.com/
- SQLAlchemy: https://docs.sqlalchemy.org/
- Alembic: https://alembic.sqlalchemy.org/
- PostgreSQL: https://www.postgresql.org/docs/
- React: https://react.dev/
- Chart.js: https://www.chartjs.org/docs/latest/

## 8. Catatan Pribadi
- Repo ini adalah jurnal belajar: catat bug + root cause + solusi singkat setiap selesai memperbaiki masalah.
- Saat bingung struktur/standar DB, cek `term_database.md` dan `notebook_database.md`.
