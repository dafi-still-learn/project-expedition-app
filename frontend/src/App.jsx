import "./App.css";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import LupaPassword from "./page/ResetPassword";
import Register from "./page/Register";
import { Navigate } from "react-router-dom";
import ExpeditionPage from "./api/ApiExpedition";
import Dashboard from "./page/Dashboard";
import Pengiriman from "./page/Delivery";
import Buat_pengiriman from "./page/MakeDelivery";
import Lacak_paket from "./page/PacketTrack";
import Pelanggan from "./page/Customers";
import Kurir from "./page/Courier";
import Lokasi from "./page/Location";
import Pembayaran from "./page/Payment";
import Laporan from "./page/Report";

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
