import { Dashboard } from "@boxicons/react";

function Sidebar() {
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
              <button>
                <Dashboard />
                Dashboard
              </button>
            </div>
            <div>
              <button>Pengiriman</button>
            </div>
            <div>
              <button>Buat pengiriman</button>
            </div>
            <div>
              <button>lacak paket</button>
            </div>
            <div>
              <button>Pelanggan</button>
            </div>
            <div>
              <button>Kurir</button>
            </div>
            <div>
              <button>Lokasi</button>
            </div>
            <div>
              <button>Pembayaran</button>
            </div>
            <div>
              <button>Laporan</button>
            </div>
          </div>
        </div>
        <div id="Sidebar-services" className="row-span-2 flex flex-col gap-10">
          <div>
            <button>Pengaturan</button>
          </div>
          <div>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
