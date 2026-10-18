import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./page/login";
import LupaPassword from "./page/ResetPassword";
import Register from "./page/register";
import { Navigate } from "react-router-dom";
import ExpeditionPage from "./api/ApiExpedition";
import Pengiriman from "./page/Delivery";
import Buat_pengiriman from "./page/MakeDelivery";
import Lacak_paket from "./page/PacketTrack";
import Pelanggan from "./page/Customers";
import Kurir from "./page/Courier";
import Lokasi from "./page/Location";
import Pembayaran from "./page/Payment";
import Laporan from "./page/Report";
import Dashboard from "./page/dashboard";
import ProtectedRoute from "./auth/ProctedRoute";
import RoleRoute from "./auth/RoleRoute";
// import { AuthContext } from "./auth/AuthContext";

function App() {
  return (
    <>
      <Routes>
        {/* <AuthContext> */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lupa_password" element={<LupaPassword />} />
        <Route path="/" element={<ExpeditionPage />}>
          {/* PAGE YANG BISA DIAKSES OLEH ADMIN */}
          <Route
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN"]} />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="laporan" element={<Laporan />} />
            <Route path="pengiriman" element={<Pengiriman />} />
            <Route path="buat_pengiriman" element={<Buat_pengiriman />} />
            <Route path="lacak_paket" element={<Lacak_paket />} />
            <Route path="pelanggan" element={<Pelanggan />} />
            <Route path="kurir" element={<Kurir />} />
            <Route path="lokasi" element={<Lokasi />} />
            <Route path="pembayaran" element={<Pembayaran />} />
          </Route>

          {/* PAGE YANG BISA DIAKSES OLEH ADMIN DAN OPERATOR */}
          <Route
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["ADMIN", "OPERATOR"]} />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* PAGE YANG BISA DIAKSES OLEH OPERATOR */}
          <Route
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["OPERATOR"]} />
              </ProtectedRoute>
            }
          >
            <Route path="pengiriman" element={<Pengiriman />} />
            <Route path="buat_pengiriman" element={<Buat_pengiriman />} />
            <Route path="lacak_paket" element={<Lacak_paket />} />
            <Route path="pelanggan" element={<Pelanggan />} />
            <Route path="kurir" element={<Kurir />} />
            <Route path="lokasi" element={<Lokasi />} />
            <Route path="pembayaran" element={<Pembayaran />} />
          </Route>
        </Route>
        {/* BAGIAN PAGE PAGE FITUR APP */}
        {/* </AuthContext> */}
      </Routes>
    </>
  );
}
export default App;
