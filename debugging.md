# Debugging Log - Expedition App

Catatan ringkas bug penting + pola debugging yang sering kepakai. Tujuan: cepat ingat penyebab dan cara cek saat error muncul lagi.

## 1. Kasus Penting yang Pernah Terjadi

### A. Data/API & Chart (frontend-backend mismatch)
- **Gejala**: chart kosong/error, data tidak tampil, mapping gagal.
- **Penyebab umum**:
  - Response backend tidak konsisten (list vs object/nested field).
  - Frontend salah ambil data (mis. ambil flag `success` bukan array data).
  - Tipe/format nilai tidak siap pakai (angka string, format koma/titik, null).
  - Container/canvas Chart.js tidak punya ukuran jelas.
- **Solusi pola**:
  - Samakan kontrak response (contoh: `{ data: [...], success: true }`).
  - Ambil data aman: `const rows = res?.data?.data ?? []`.
  - Guard: `Array.isArray(rows)` sebelum `.map()`, normalisasi angka/tanggal.
  - Pastikan wrapper chart punya tinggi/lebar (`min-height`, container relatif).

### B. Auth/JWT & Refresh Flow
- **Gejala**: login loop, role hilang, terlempar ke login saat refresh, render berlebih.
- **Penyebab umum**:
  - Data dari DB (mis. ID/role) tidak diekstrak benar sebelum masuk JWT/response.
  - Frontend akses data nested tanpa guard (`data.role_user[0][0]`) saat response null/error.
  - Race condition & state effect tidak stabil (`useEffect`/`useCallback`/dependency/value context).
  - Error non-auth ditangani seperti logout paksa.
- **Solusi pola**:
  - Backend: pastikan payload/token pakai nilai murni (bukan tuple/list mentah).
  - Frontend: pakai optional chaining + fallback, pisahkan status loading/init/auth.
  - Stabilkan fungsi/context (`useCallback`, `useMemo`) dan hindari pemrosesan ganda (login vs provider).
  - Hanya hapus sesi pada kondisi auth invalid (mis. 401), bukan semua error.

### C. Database/Schema & Integrasi
- **Gejala**: insert/update gagal, data tidak sesuai, fitur baru tidak sinkron.
- **Penyebab umum**:
  - Tipe kolom DB vs payload backend/frontend tidak cocok.
  - Migration belum jalan / model belum selaras dengan schema.
  - Perubahan di satu layer tidak diikuti layer lain.
- **Solusi pola**:
  - Cek schema & data langsung di PostgreSQL.
  - Jalankan/cek Alembic (`alembic current`, `history`, `upgrade head`) dan review file migration.
  - Update berurutan: schema/model → service/router → kontrak API → UI.

## 2. Checklist Cepat Saat Error (pakai ini dulu)
1. **Reproduksi**: aksi apa yang memicu? (login, refresh, submit, fetch, render chart)
2. **Tentukan layer**: frontend / backend / database.
3. **Cek kontrak data**: log request & response aktual (bentuk + tipe).
4. **Cek auth**: token terkirim, valid/expired, role terbaca benar.
5. **Cek state/effect (FE)**: loading, guard null/array, dependency hook.
6. **Cek schema/migration (DB)**: tipe kolom, relasi, migration status.
7. **Fix kecil lalu tes ulang** (1 perubahan dalam 1 waktu).
8. **Catat**: gejala, root cause, solusi, pencegahan (1-3 baris).

## 3. Pola Debugging per Layer

### Frontend (React/TS)
- Cek: `res.data` vs `res.data.data`, `Array.isArray`, `?.`, `?? []`
- Waspadai: render loop, race condition auth, stale state, dependency effect
- Chart/form: normalisasi data sebelum render/submit

### Backend (FastAPI/Service)
- Cek: schema request (422), bentuk return, exception handling, status code
- Waspadai: logic bisnis salah hitung/format, akses data DB mentah (tuple/list) tanpa ekstraksi

### Database (PostgreSQL/SQLAlchemy/Alembic)
- Cek: tipe data, constraint/relasi, hasil query di DB tool, migration applied
- Waspadai: perubahan schema tidak sinkron dengan model/service/frontend

## 4. Fokus Tantangan Belajarku (untuk diperbaiki bertahap)
- Mengingat syntax SQLAlchemy/Alembic saat menulis dari nol.
- Menjaga konsistensi kontrak response antar endpoint.
- Membiasakan update end-to-end saat schema/data berubah.

## 5. Template Catatan Bug Baru (singkat)
```md
### [Tanggal] - [Fitur/Modul]
- Gejala:
- Root cause:
- Solusi:
- Pencegahan:
```
