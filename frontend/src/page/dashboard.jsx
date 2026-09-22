import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
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
            className="grid gap-2 grid-cols-3 grid-rows-2 w-full h-full"
            id="dashboard-card"
          >
            {/* BERISI CARD UNTUK SETIAP FITUR YANG PENTING */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
