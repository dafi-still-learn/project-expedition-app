import Navbar from "../components/navbar";
import { CheckCircle } from "@boxicons/react";
import LeafletMap from "../services/PengirimanOpenStreetMap";
import DiagramFinansial from "../components/DiagramPieFinansial";
import DiagramFinansialBar from "../components/DiagramBarPacket";
import DiagramMultiLinePacket from "../components/DiagramMultiLinePacket";
import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";
import Profil from "../components/Profil";
import { DiagramLine } from "../components/DiagramLine";
import { useGetDataPaket } from "../hooks/useGetDataPaket";

function Dashboard() {
  const openProfil = localStorage.getItem("profilComplete");
  const { dataHarga, dataTanggalKirim, dataPelanggan, loading } =
    useGetDataPaket();
  const item_data = [123, 25, 13];
  const item_data_packet = [99, 32, 61];

  const harga_pengiriman = Array.isArray(dataHarga)
    ? dataHarga.map((p: any) => {
        const raw = p ?? "0";
        // Bersihkan format Indonesia: "Rp10.240.750,00" -> 10240750
        const cleaned = raw.replace(/[^\d,]/g, "").replace(",", ".");
        return parseFloat(cleaned) || 0;
      })
    : [];

  return (
    <>
      <section className="w-screen h-screen" id="Container-dashboard">
        {openProfil && <Profil></Profil>}
        {/* <Profil></Profil> */}
        <div className="flex flex-col gap-5 overflow-hidden h-[calc(100vh-80px)]">
          <Navbar></Navbar>
          <div
            className="grid gap-1 grid-rows-2 w-full
            overflow-hidden"
            id="dashboard-card"
          >
            {/* BERISI CARD UNTUK SETIAP FITUR YANG PENTING */}
            <div className="row-span-1 grid grid-cols-3 gap-2  overflow-hidden">
              <div className="shadow-lg flex w-full h-full">
                <DiagramFinansialBar item_data={item_data_packet} />
              </div>
              <div className="shadow-lg" id="pendapatan-card">
                <DiagramFinansial item_data={item_data} />
              </div>
              <div className="shadow-lg h-full w-full">
                <h1>hasil pengiriman</h1>
                <div>
                  <h1>pengiriman berhasil:</h1>
                  <ul></ul>
                </div>
                <div>
                  <h1>pengiriman gagal:</h1>
                  <ul></ul>
                </div>
              </div>
            </div>
            <div className="row-span-1 grid grid-cols-3 gap-2 w-full h-full overflow-hidden">
              <div className="shadow-lg grid gap-1 grid-cols-1 col-span-2">
                <DiagramLine
                  data={harga_pengiriman}
                  labels={dataTanggalKirim}
                />
              </div>
              <div
                className="shadow-lg grid grid-rows-2 col-span-1 gap-5
             overflow-y-auto overflow-x-hidden"
              >
                {dataPelanggan.map((item: any) => {
                  return (
                    <>
                      <ul
                        key={item.id}
                        className="grid grid-cols-8 gap-1 justify-between list-inside bg-blue-200 cursor-pointer"
                      >
                        <li className="col-span-2">{item.nama_pelanggan}</li>
                        <li className="col-span-3">{item.nama_paket}</li>
                        <li className="col-span-3">{item.harga_paket}</li>
                      </ul>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
