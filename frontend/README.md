# Frontend - Expedition App (React + Vite)

Frontend ini adalah bagian UI dari project belajarku (learning by doing). Fokus utamanya: memahami alur autentikasi, integrasi API, state/data flow, dan visualisasi data.

## Stack & Hal yang Sudah Dipelajari
- **React + Vite** sebagai base aplikasi
- **TypeScript + JavaScript** (migrasi bertahap, beberapa file masih `.jsx`)
- **React Router** untuk routing halaman dan proteksi route/role
- **Axios** untuk komunikasi ke backend FastAPI
- **Chart.js** untuk dashboard/laporan visual
- **CSS modular per page/component** untuk styling

## Struktur Penting (`frontend/src/`)
- `api/` → konfigurasi Axios & pemanggilan endpoint
- `auth/` → AuthContext, protected route, role route, helper auth
- `components/` → komponen UI (diagram, form, sidebar, dll)
- `hooks/` → custom hook pengambilan data (`useGetDataPaket`, `useGetDataPelanggan`)
- `page/` → halaman aplikasi (Dashboard, Delivery, MakeDelivery, PacketTrack, dll)
- `services/` → logic pendukung (estimasi jarak/harga/waktu, barcode, wilayah, dll)

## Alur Frontend yang Perlu Diingat
1. User login → token/role diproses di auth context.
2. Route dilindungi oleh `ProtectedRoute` / `RoleRoute`.
3. Halaman memanggil hook/service untuk fetch data backend.
4. Response dinormalisasi (cek bentuk data, array/object, null-safe).
5. State di-update → UI/chart dirender.

## Catatan Progres Belajar Frontend
- Sudah paham dasar integrasi frontend-backend dan auth flow.
- Sudah praktik debugging render loop, masalah token/role, dan mismatch bentuk response.
- Masih sering perlu mengingat pola syntax (hooks dependency, typing TS, bentuk response API), jadi biasakan cek `frontend/debugging.md` dan `learning.md`.

## Menjalankan Frontend
```bash
npm install
npm run dev
```

Biasanya berjalan di `http://localhost:5173` (tergantung konfigurasi Vite).

## Catatan untuk Diri Sendiri
- Saat error data/chart: cek dulu bentuk response API di console.
- Saat error auth: cek token, refresh flow, dan guard (`?.`, kondisi loading/auth).
- Saat bingung struktur: lihat contoh pola yang sudah ada di `hooks/`, `services/`, dan `page/`.
