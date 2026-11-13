import Navbar from "../components/navbar";

import DiagramFinansial from "../components/DiagramPieFinansial";
import DiagramFinansialBar from "../components/DiagramBarPacket";

import Profil from "../components/Profil";
import { DiagramLine } from "../components/DiagramLine";
import { useGetDataPaket } from "../hooks/useGetDataPaket";

function Dashboard() {
  const openProfil = localStorage.getItem("profilComplete");
  const { dataHarga, dataTanggalKirim, dataPelanggan, loading } =
    useGetDataPaket();
  const item_data = [123, 25, 13];
  const item_data_packet = [99, 32, 61];

  console.log(Array.isArray(dataPelanggan));

  dataPelanggan.forEach((item) => {
    console.log(item.nama_pelanggan);
  });

  const harga_pengiriman = Array.isArray(dataHarga)
    ? dataHarga.map((p) => {
        const raw = String(p ?? "0");
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
             overflow-y-auto overflow-x-hidden p-3"
              >
                <h1>Daftar pelanggan</h1>
                {loading ? (
                  <p>Memuat data pelanggan...</p>
                ) : dataPelanggan.length === 0 ? (
                  <p>Belum ada data pelanggan</p>
                ) : (
                  dataPelanggan.map((pelanggan, index) => (
                    <ul
                      key={pelanggan.id ?? index}
                      className="border rounded p-2 text-sm"
                    >
                      <li>Nama: {pelanggan.nama_pelanggan ?? "-"}</li>
                      <li>No. HP: {pelanggan.nomor_hp ?? "-"}</li>
                      <li>Paket: {pelanggan.nama_paket ?? "-"}</li>
                      <li>
                        Rute: {pelanggan.asal_pengiriman ?? "-"} →{" "}
                        {pelanggan.tujuan_pengiriman ?? "-"}
                      </li>
                      <li>Jumlah: {pelanggan.jumlah_paket ?? "-"}</li>
                      <li>Harga: {pelanggan.harga_paket ?? "-"}</li>
                    </ul>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
