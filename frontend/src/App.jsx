import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import LupaPassword from "./page/lupa_password";
import Register from "./page/register";
import { Navigate } from "react-router-dom";
import ExpeditionPage from "./api/api_expedition";
import Dashboard from "./page/dashboard";
import Pengiriman from "./page/pengiriman";
import Buat_pengiriman from "./page/buat_pengiriman";
import Lacak_paket from "./page/lacak_paket";
import Pelanggan from "./page/pelanggan";
import Kurir from "./page/kurir";
import Lokasi from "./page/lokasi";
import Pembayaran from "./page/pembayaran";
import Laporan from "./page/laporan";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={<Login />} replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa_password" element={<LupaPassword />} />

        {/* BAGIAN PAGE PAGE FITUR APP */}
        <Route path="/" element={<ExpeditionPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pengiriman" element={<Pengiriman />} />
          <Route path="buat_pengiriman" element={<Buat_pengiriman />} />
          <Route path="lacak_paket" element={<Lacak_paket />} />
          <Route path="pelanggan" element={<Pelanggan />} />
          <Route path="kurir" element={<Kurir />} />
          <Route path="lokasi" element={<Lokasi />} />
          <Route path="pembayaran" element={<Pembayaran />} />
          <Route path="laporan" element={<Laporan />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
