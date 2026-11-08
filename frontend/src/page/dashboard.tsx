import Navbar from "../components/navbar";
import { CheckCircle } from "@boxicons/react";
import LeafletMap from "../services/PengirimanOpenStreetMap";
import DiagramFinansial from "../components/DiagramPieFinansial";
import DiagramFinansialBar from "../components/DiagramBarPacket";
import DiagramMultiLinePacket from "../components/DiagramMultiLinePacket";
import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";
import Profil from "../components/Profil";
import { DiagramLine } from "../components/DiagramLine";
import { GetDataPaket } from "../services/GetDataPaket";
import { useAuth } from "../auth/AuthContext";

function Dashboard() {
  const openProfil = localStorage.getItem("profilComplete");
  const { token } = useAuth();
  const item_data = [123, 25, 13];
  const item_data_packet = [99, 32, 61];

  return (
    <>
      <section className="w-screen h-screen" id="Container-dashboard">
        {openProfil && <Profil></Profil>}
        {/* <Profil></Profil> */}
        <div className="flex flex-col gap-5" id="dashboard">
          <Navbar></Navbar>
          <div
            className="grid gap-6 grid-rows-2 w-full h-full
            overflow-hidden"
            id="dashboard-card"
          >
            {/* BERISI CARD UNTUK SETIAP FITUR YANG PENTING */}
            <div className="row-span-0.5 grid grid-cols-3 gap-2 h-90 overflow-hidden">
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
            <div className="row-span-1.5 grid grid-cols-3 gap-2">
              <div
                className="shadow-lg grid gap-1 grid-cols-1 grid-rows-6 col-span-2  w-full"
                id="list_pengiriman_dashboard"
              >
                {<GetDataPaket token={token}></GetDataPaket>}
                {/* <DiagramLine datasetData={} labels={} /> */}
              </div>
              {/* <div className="shadow-lg">
                <LeafletMap />
              </div> */}
              <div
                className="shadow-lg grid grid-rows-2 w-full h-full col-span-1 gap-2
            "
              >
                {/* <DiagramMultiLineFinansial />
              <DiagramMultiLinePacket /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
