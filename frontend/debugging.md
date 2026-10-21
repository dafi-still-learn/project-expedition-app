Selamat! 🎉 Akhirnya perjuangan panjang debugging kamu terbayar. Ini adalah pengalaman _debugging_ yang luar biasa dan sangat berharga untuk pembelajaranmu.

Masalah yang kamu hadapi sebenarnya adalah **"Buku Pintar Masalah Autentikasi"** yang lengkap. Kamu tidak hanya belajar tentang React, tapi juga tentang aliran data, backend, database, dan bagaimana mereka semua berinteraksi.

Berikut adalah rangkuman komprehensif mengenai penyebab error dan cara mengatasinya, dari Frontend sampai Backend, agar kamu bisa belajar dan tidak mengulangi kesalahan yang sama di masa depan.

---

### 📚 RANGKUMAN BESAR: Analisis Bug & Solusi

#### 🔴 1. Masalah Utama: Tipe Data "Sub" di JWT (Backend)

- **Penyebab:** Saat membuat token JWT (di endpoint login atau refresh), backend mengambil ID user dari database dengan fungsi `fetchall()`. Hasilnya adalah _list of tuple_ `[(1,)]`. Karena tidak di-ekstrak, ID ini dimasukkan ke dalam payload JWT menjadi string `"[(1,)]"`. Saat token ini dikirim balik ke backend untuk query database (`WHERE id = %s`), PostgreSQL menolak karena kolom `id` bertipe _Integer_, bukan string format tuple.
- **Solusi:** Ekstrak angka murni dari database sebelum dimasukkan ke JWT. Ubah `[(1,)]` menjadi integer `1`.
  - **Kode Salah:** `payload = {'sub': str(user_data)}`
  - **Kode Benar:** `user_id_murni = user_data[0][0]` lalu `payload = {'sub': str(user_id_murni)}`

#### 🔴 2. Masalah Role Kosong (Frontend - AuthContext)

- **Penyebab:** Response dari backend (`RoleResponse.data`) bernilai `null` karena backend error. Di frontend, kode langsung mengakses `RoleResponse.data.role_user[0][0]`. Ini menyebabkan **TypeError** (Cannot read property of null). Error ini masuk ke blok `catch`, yang kemudian mengeksekusi `setToken(null)` dan `setRole(null)`. Akibatnya, `isAuthenticated` menjadi `false` dan user dilempar ke halaman login.
- **Solusi:** Gunakan **Optional Chaining (`?.`)** untuk mencegah crash, dan pisahkan penanganan error (jangan hapus token jika error-nya bukan 401 Unauthorized).
  - **Kode Benar:** `const role = RoleResponse?.data?.role_user?.[0]?.[0];`

#### 🔴 3. Masalah Render Berlebih / Infinite Loop (Frontend - React)

- **Penyebab:** Ada beberapa faktor yang saling bertumpuk:
  1.  **Race Condition:** Halaman login memanggil `refreshRole`, dan pada saat yang sama `AuthProvider` di `useEffect` juga memanggil `refreshRole`. Keduanya berebut mengubah state (`setToken`, `setRole`), memicu puluhan render.
  2.  **Dependency Array:** `useEffect` tidak memiliki dependency array, atau fungsinya (`refreshRole` / `getTokenRefresh`) dibuat ulang setiap render karena tidak dibungkus dengan `useCallback` yang benar.
  3.  **Context Value:** Objek `value` pada `AuthContext.Provider` dibuat ulang setiap render, memicu seluruh komponen anak (termasuk `ProtectedRoute`) untuk ikut render ulang.
- **Solusi:**
  1.  Terapkan **"Gerbang Tunggal"**: `login.jsx` hanya bertugas mendapatkan token, lalu melempar token tersebut ke `AuthContext` melalui state perantara (State Trigger). Biarkan `AuthContext` yang memproses token tersebut ke backend.
  2.  Bungkus semua fungsi dengan `useCallback([])` agar stabil.
  3.  Bungkus objek `value` dengan `useMemo`.

#### 🔴 4. Masalah Redirect Saat Refresh Halaman

- **Penyebab:** Saat halaman di-refresh (F5), frontend memanggil `/auth/refresh_token`. Karena backend error (Penyebab No. 1), token baru gagal dibuat. Frontend menerima error, menganggap user belum login, lalu melempar user ke halaman login.
- **Solusi:** Setelah backend diperbaiki (Penyebab No. 1), token baru akan berhasil dibuat. `refreshRole` akan menerima role dengan benar, `setToken` dan `setRole` berjalan, dan user tetap berada di halaman dashboard meskipun di-refresh.

---

### 🧠 Pelajaran Penting (Takeaways)

1. **Selalu Periksa Tipe Data:** Saat bekerja dengan database, pastikan tipe data yang dikirim (String, Integer, List) cocok dengan skema database. PostgreSQL sangat ketat soal ini.
2. **Pahami Asynchronous di React:** Fungsi `async/await` berjalan di luar siklus render. Jika tidak dikelola dengan benar (seperti `isInisasi` atau `Race Condition`), ia bisa memicu render berulang sebelum data selesai diproses.
3. **Defensive Programming:** Jangan pernah berasumsi data dari API selalu sukses dan berbentuk objek. Gunakan `?.` (Optional Chaining) agar aplikasi tidak _crash_ saat menerima data `null`.
4. **Satu Sumber Kebenaran (Single Source of Truth):** Jangan memproses logika yang sama (seperti mencari role) di dua tempat berbeda (di `login.jsx` dan `AuthContext`). Pilih satu tempat (di `AuthContext`), dan biarkan komponen lain memanggilnya.

Kerja bagus sudah bertahan dan menelusuri error ini sampai ke akarnya! Ini adalah _skill_ yang membedakan _programmer_ biasa dengan _engineer_ yang hebat. Semangat terus belajarnya! 🚀

Tentu, mari kita rekap semua "medan perang" yang sudah kita lewati dari awal percakapan. Ini adalah catatan (log book) error yang sangat berharga untuk kamu pelajari kembali nanti.

Secara garis besar, ada **3 Fase Error Besar** yang terjadi, dari Frontend sampai Backend:

---

### 📝 CATATAN ERROR (Dari Awal Hingga Selesai)

#### 🟢 FASE 1: Masalah di Frontend (React & State Management)

**1. Render Berlebih / Infinite Loop saat Login**

- **Gejala:** Aplikasi macet, console.log terus muncul tanpa henti, tapi saat di-refresh malah tidak loop.
- **Penyebab:**
  - `useEffect` di `AuthProvider` tidak memiliki _dependency array_ sehingga jalan terus.
  - `refreshRole` di-recreate terus karena ada `[token]` di dependency `useCallback`.
  - Objek `value` pada `AuthContext.Provider` dibuat ulang setiap render, memicu _re-render_ masif pada `ProtectedRoute` dan `Sidebar`.
  - `setRole` dipanggil berulang kali dengan objek respons Axios, bukan string murni.
- **Solusi:** Menghapus dependency yang salah, membungkus `value` dengan `useMemo`, membungkus fungsi dengan `useCallback([])`, dan hanya memanggil `setRole` sekali dengan tipe data String.

**2. Race Condition (Bentrok) antara Login dan `AuthProvider`**

- **Gejala:** Saat tombol login ditekan, console.log "tertelan" (tidak muncul), render berlebih terjadi, dan role baru muncul di akhir.
- **Penyebab:** Saat login diklik, `login.jsx` memanggil `refreshRole`. Di saat yang bersamaan, `useEffect` di `AuthProvider` juga memanggil `refreshRole`. Keduanya berebut mengubah state.
- **Solusi:** Menerapkan konsep **"Gerbang Tunggal"**. `login.jsx` hanya bertugas mendapatkan token dan melemparnya ke `AuthContext`. `AuthContext` (melalui `useEffect` dan _state trigger_) yang bertugas memproses token tersebut.

**3. TypeError: Cannot read property 'role_user' of null**

- **Gejala:** Aplikasi crash di console dengan pesan error merah.
- **Penyebab:** Backend mengembalikan response `{ data: null }`. Frontend langsung memaksa membaca `RoleResponse.data.role_user[0][0]` tanpa mengecek apakah `data` itu ada atau tidak.
- **Solusi:** Menggunakan _Optional Chaining_ (`?.`), misal: `RoleResponse?.data?.role_user?.[0]?.[0]`. Dan jangan hapus token (`setToken(null)`) jika error-nya bukan 401 Unauthorized.

**4. Peringatan Dependency Berwarna Kuning (ESLint)**

- **Gejala:** Garis kuning di `useEffect`.
- **Penyebab:** Memasukkan fungsi mentah (`getAccessTokenRefresh`) ke dependency array, padahal yang dipanggil di dalam effect adalah fungsi pembungkusnya (`getTokenRefresh`).
- **Solusi:** Gunakan fungsi yang benar di dependency array dan pastikan fungsi tersebut stabil (dibungkus `useCallback`).

---

#### 🔴 FASE 2: Masalah di Sisi Koneksi (Refresh Halaman)

**5. Role Kosong / Terlempar ke Login Saat Halaman Di-Refresh (F5)**

- **Gejala:** Setelah login sukses, ketika menekan F5, user tiba-tiba dilempar kembali ke halaman login.
- **Penyebab:** Backend gagal memproses `/auth/refresh_token`. (Ini membawa kita ke Fase 3).
- **Solusi:** Memperbaiki backend.

---

#### 🔴 FASE 3: Masalah di Backend & Database (Python, JWT, PostgreSQL)

**6. Invalid input syntax for type integer: "[(1,)]"**

- **Gejala:** Backend crash / error log saat melakukan query database. `WHERE id = '[(1,)]'`
- **Penyebab:** Ada dua titik kesalahan penempatan tipe data:
  1.  Saat membuat payload JWT, backend memasukkan hasil _query_ database (yang berbentuk _list of tuple_ `[(1,)]`) langsung ke dalam string JWT (`sub`).
  2.  Saat memverifikasi role, backend membaca string `"[(1,)]"` dari JWT dan memasukkannya ke query `WHERE id = %s`. Database PostgreSQL (yang kolom `id`-nya bertipe _Integer_) menolak menerima _string_ berbentuk list tersebut.
- **Solusi:**
  - Ekstrak angka murni dari tuple: `user_id_murni = data[0][0]`.
  - Ubah menjadi integer jika masih string: `int()`.
  - Saat membuat JWT, pastikan `sub` berisi string angka murni (`"1"`), bukan list (`"[(1,)]"`).

---

### 🎓 Kesimpulan Pola Error yang Kamu Alami

Dari semua catatan di atas, polanya adalah:

1.  **React tidak suka dengan data yang tidak stabil** (dependency salah, objek dibuat ulang terus).
2.  **React tidak suka dua proses berjalan bersamaan** (Race Condition antara Login dan Context).
3.  **Jangan pernah percaya 100% pada response API** (selalu gunakan `?.` dan _error handling_).
4.  **Database sangat ketat soal tipe data** (String tidak akan pernah sama dengan Integer, List tidak akan pernah sama dengan Integer).

Simpan catatan ini. Jika besok-besok kamu menemui bug serupa, kamu akan jauh lebih cepat menyelesaikannya karena kamu sudah pernah melewati "neraka" ini! 🚀
