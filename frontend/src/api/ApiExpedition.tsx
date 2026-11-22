// TEMPAT MENAMPILKAN DATA PENTING DARI DATABASE
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Setting from "../page/Setting";
import Sidebar from "../components/sidebar";
import { FitlerDelivery } from "../services/filterDelivery";
import Pengiriman from "../page/Delivery";

function ExpeditionPage() {
  const location = useLocation();
  const [openSetting, setOpenSetting] = useState<boolean>(false);

  return (
    <>
      <div
        className="flex w-screen h-screen overflow-hidden p-2"
        id="container-expedition"
      >
        <Sidebar openSetting={() => setOpenSetting(true)} />
        {/* <Pengiriman
          dataFilter={dataFilter}
          openFilter={() => setOpenFilter(true)}
        ></Pengiriman> */}
        <Outlet context={{ location, openSetting }} />

        {openSetting && <Setting onClose={() => setOpenSetting(false)} />}
      </div>
    </>
  );
}

export default ExpeditionPage;
