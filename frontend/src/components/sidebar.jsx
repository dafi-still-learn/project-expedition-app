import {
  Dashboard,
  Truck,
  PlusCircle,
  PaperPlane,
  Community,
  Location,
  Report,
  WalletNote,
  Timeline,
  Cog,
  DoorOpenAlt,
} from "@boxicons/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Sidebar({ openSetting }) {
  const navigate = useNavigate();

  const { logout, role } = useAuth();

  function handleLogOut() {
    console.log("TOMBOL LOGOUT SUDAH DITEKAN");
    navigate("/login");
    logout();
  }

  console.log(openSetting);

  return (
    <>
      <div
        className="fixed col-span-3 grid grid-cols-1 grid-rows-12 h-full justify-between bg-amber-300 border-r border-gray-300"
        id="Container-sidebar"
      >
        <div className="row-span-10 grid grid-rows-7" id="Sidebar-Fiture">
          <div id="logo" className="row-span-1">
            {/* LOGO ATAU NAMA */}
            <h1>Logistra</h1>
          </div>
          {role === "OPERATOR" && (
            <>
              <div className="grid grid-rows-10 h-full row-span-6" id="fiture">
                <Link to={"/dashboard"} className="button_link">
                  <Dashboard />
                  Dashboard
                </Link>
                <Link to={"/buat_pengiriman"} className="button_link">
                  <PlusCircle />
                  Buat Pengiriman
                </Link>
                <Link to={"/lacak_paket"} className="button_link">
                  <Timeline />
                  Lacak Paket
                </Link>
                <Link to={"/lokasi"} className="button_link">
                  <Location />
                  Lokasi
                </Link>
              </div>
            </>
          )}

          {role == "ADMIN" && (
            <>
              <div className="grid grid-rows-10 h-full row-span-6" id="fiture">
                <Link to={"/dashboard"} className="button_link">
                  <Dashboard />
                  Dashboard
                </Link>
                <Link to={"/buat_pengiriman"} className="button_link">
                  <PlusCircle />
                  Buat Pengiriman
                </Link>
                <Link to={"/lacak_paket"} className="button_link">
                  <Timeline />
                  Lacak Paket
                </Link>
                <Link to={"/lokasi"} className="button_link">
                  <Location />
                  Lokasi
                </Link>
                <Link to={"/laporan"} className="button_link">
                  <Report />
                  Laporan
                </Link>
                <Link to={"/pengiriman"} className="button_link">
                  <PaperPlane />
                  Pengiriman
                </Link>
                <Link to={"/pelanggan"} className="button_link">
                  <Community />
                  Pelanggan
                </Link>
                <Link to={"/kurir"} className="button_link">
                  <Truck />
                  Kurir
                </Link>
                <Link to={"/pembayaran"} className="button_link">
                  <WalletNote />
                  Pembayaran
                </Link>
              </div>
            </>
          )}
        </div>
        <div
          id="Sidebar-services"
          className="row-span-2 flex flex-col gap-10 border-t border-gray-300"
        >
          <div>
            <button onClick={openSetting}>
              <Cog />
              Pengaturan
            </button>
          </div>
          <div>
            <button onClick={handleLogOut}>
              <DoorOpenAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
