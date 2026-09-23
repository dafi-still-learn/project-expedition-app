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

function Sidebar() {
  const navigate = useNavigate();

  function handleDashboard() {
    navigate("/dashboard");
  }

  function handlePengiriman() {
    navigate("/pengiriman");
  }

  function handleBuatPengiriman() {
    navigate("/buat_pengiriman");
  }

  function handleLacakPaket() {
    navigate("/lacak_paket");
  }

  function handlePelanggan() {
    navigate("/pelanggan");
  }

  function handleKurir() {
    navigate("/kurir");
  }

  function handleLokasi() {
    navigate("/lokasi");
  }

  function handlePembayaran() {
    navigate("/pembayaran");
  }

  function handleLaporan() {
    navigate("/laporan");
  }

  return (
    <>
      <div
        className="col-span-3 grid grid-cols-1 grid-rows-12 justify-between bg-amber-300 border-r border-gray-300"
        id="Container-sidebar"
      >
        <div className="row-span-10 grid grid-rows-7" id="Sidebar-Fiture">
          <div id="logo" className="row-span-1">
            {/* LOGO ATAU NAMA */}
            <h1>Logistra</h1>
          </div>
          <div className="grid grid-rows-10 h-full row-span-6" id="fiture">
            <div>
              <button onClick={handleDashboard}>
                <Dashboard />
                Dashboard
              </button>
            </div>
            <div>
              <button onClick={handlePengiriman}>
                <PaperPlane />
                Pengiriman
              </button>
            </div>
            <div>
              <button onClick={handleBuatPengiriman}>
                <PlusCircle />
                Buat pengiriman
              </button>
            </div>
            <div>
              <button onClick={handleLacakPaket}>
                <Timeline />
                lacak paket
              </button>
            </div>
            <div>
              <button onClick={handlePelanggan}>
                <Community />
                Pelanggan
              </button>
            </div>
            <div>
              <button onClick={handleKurir}>
                <Truck />
                Kurir
              </button>
            </div>
            <div>
              <button onClick={handleLokasi}>
                <Location />
                Lokasi
              </button>
            </div>
            <div>
              <button onClick={handlePembayaran}>
                <WalletNote />
                Pembayaran
              </button>
            </div>
            <div>
              <button onClick={handleLaporan}>
                <Report />
                Laporan
              </button>
            </div>
          </div>
        </div>
        <div
          id="Sidebar-services"
          className="row-span-2 flex flex-col gap-10 border-t border-gray-300"
        >
          <div>
            <button>
              <Cog />
              Pengaturan
            </button>
          </div>
          <div>
            <button>
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
