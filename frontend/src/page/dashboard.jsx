import Navbar from "../components/Navbar";
import { CheckCircle } from "@boxicons/react";
// import ApexMaps from "apexmaps";
import LeafletMap from "../services/openStreetMap";
import DiagramFinansial from "../components/DiagramPieFinansial";
import DiagramFinansialBar from "../components/DiagramBarPacket";
import DiagramMultiLinePacket from "../components/DiagramMultiLinePacket";
import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";
// import PieChartDefaultIndex from "../services/DiagramPie";

function Dashboard() {
  const listCustomer = [
    {
      id: 1,
      name: "paket 1",
      date: "23 september 2025",
      price: "Rp.350.000.00",
      custumer: "andrea setyawan",
      quantity: "2 Qty",
    },
    {
      id: 2,
      name: "paket 2",
      date: "23 september 2025",
      price: "Rp.500.000.00",
      custumer: "iqbal fauzan",
      quantity: "4 Qty",
    },
    {
      id: 3,
      name: "paket 3",
      date: "23 september 2025",
      price: "Rp.300.000.00",
      custumer: "dinda pangestu",
      quantity: "2 Qty",
    },
    {
      id: 4,
      name: "paket 4",
      date: "23 september 2025",
      price: "Rp.600.000.00",
      custumer: "tikia ardiasyah",
      quantity: "5 Qty",
    },
    {
      id: 5,
      name: "paket 5",
      date: "23 september 2025",
      price: "Rp, 550.000.00",
      custumer: "Kelvin hutapeaw",
      quantity: "5 Qty",
    },
  ];

  const item_data = [123, 25, 13];
  const item_data_packet = [99, 32, 61];

  return (
    <>
      <section className="w-screen h-screen" id="Container-dashboard">
        <div className="flex flex-col gap-5 " id="dashboard">
          <Navbar></Navbar>
          <div
            className="grid gap-6 grid-cols-3 grid-rows-2 w-full h-full
            overflow-hidden "
            id="dashboard-card"
          >
            {/* BERISI CARD UNTUK SETIAP FITUR YANG PENTING */}
            <div className="shadow-lg flex">
              <DiagramFinansialBar item_data={item_data_packet} />
            </div>
            <div className="shadow-lg" id="pendapatan-card">
              <DiagramFinansial item_data={item_data} />
            </div>
            <div className="shadow-lg">
              <h1>hasil pengiriman</h1>
              <div>
                <h1>pengiriman berhasil:</h1>
                <ul>
                  <li>
                    <CheckCircle />
                    <h1>paket 1</h1>
                  </li>
                  <li>
                    <CheckCircle />
                    <h1>paket 1</h1>
                  </li>
                  <li>
                    <CheckCircle />
                    <h1>paket 1</h1>
                  </li>
                  <li>
                    <CheckCircle />
                    <h1>pat 1</h1>
                  </li>
                </ul>
              </div>
              <div>
                <h1>pengiriman gagal:</h1>
                <ul>
                  <li>
                    <CheckCircle />
                    <h1>paket 2</h1>
                  </li>
                  <li>
                    <CheckCircle />
                    <h1>paket 2</h1>
                  </li>
                  <li>
                    <CheckCircle />
                    <h1>paket 2</h1>
                  </li>
                  <li>
                    <CheckCircle />
                    <h1>pa 2</h1>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="shadow-lg grid gap-1 grid-cols-1 grid-rows-6  w-full"
              id="list_pengiriman_dashboard"
            >
              {listCustomer.map((item) => {
                return (
                  <ul className="grid gap-1 w-full h-full" id="ul-pengiriman">
                    <li className="row-span-1 grid grid-cols-9">
                      <h1 className="col-span-2">{item.name}</h1>
                      <h1 className="col-span-4">{item.date}</h1>
                      <h1 className="col-span-3">{item.custumer}</h1>
                    </li>
                  </ul>
                );
              })}
            </div>
            <div className="shadow-lg">
              <LeafletMap />
            </div>
            <div
              className="shadow-lg grid grid-rows-2 w-full h-full
            "
            >
              <DiagramMultiLineFinansial />
              <DiagramMultiLinePacket />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
