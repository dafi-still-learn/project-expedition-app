import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { UserCheck, CheckCircle } from "@boxicons/react";
function Dashboard() {
  return (
    <>
      <section
        className="grid grid-cols-20 w-screen h-screen"
        id="Container-dashboard"
      >
        <Sidebar></Sidebar>
        <div
          className="col-span-17 flex flex-col gap-5 bg-indigo-400"
          id="dashboard"
        >
          <Navbar></Navbar>
          <div
            className="grid gap-6 grid-cols-3 grid-rows-2 w-full h-full"
            id="dashboard-card"
          >
            {/* BERISI CARD UNTUK SETIAP FITUR YANG PENTING */}
            <div className="shadow-lg">
              <div>
                <h1>total paket:</h1>
                <h1>99</h1>
              </div>
              <div>
                <h1>paket baru:</h1>
                <h1>32</h1>
              </div>
              <div>
                <h1>paket lama:</h1>
                <h1>61</h1>
              </div>
            </div>
            <div className="shadow-lg">
              <h1>pendapatan</h1>
              <ul>
                <li>
                  <h1>dana tersedia:</h1>
                  <h1>Rp.123.000.000.00</h1>
                </li>
                <li>
                  <h1>dana pendapatan:</h1>
                  <h1>Rp.25.000.000.00</h1>
                </li>
                <li>
                  <h1>dana pengeluaran:</h1>
                  <h1>Rp.13.000.000.00</h1>
                </li>
              </ul>
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
                    <h1>paket 1</h1>
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
                    <h1>paket 2</h1>
                  </li>
                </ul>
              </div>
            </div>
            <div className="shadow-lg">
              <h1>costumer yang berhasil:</h1>
              <ul>
                <li>
                  <UserCheck />
                  <h1>andrea setyawan</h1>
                </li>
                <li>
                  <UserCheck />
                  <h1>tikia ardiasyah</h1>
                </li>
                <li>
                  <UserCheck />
                  <h1>iqbal fauzan</h1>
                </li>
                <li>
                  <UserCheck />
                  <h1>dinda pangestu</h1>
                </li>
              </ul>
            </div>
            <div className="shadow-lg">
              <h1>peta pengiriman</h1>
            </div>
            <div className="shadow-lg">
              <h1>laporan pengiriman</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
