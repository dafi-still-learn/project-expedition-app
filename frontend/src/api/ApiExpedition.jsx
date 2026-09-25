// TEMPAT MENAMPILKAN DATA PENTING DARI DATABASE
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Setting from "../page/Setting";
import Sidebar from "../components/Sidebar";
function ExpeditionPage() {
  const location = useLocation();
  //   const [profil, setProfil] = useState(null);
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <>
      <div
        className="grid grid-cols-20 w-screen h-screen"
        id="container-expedition"
      >
        <Sidebar openSetting={() => setOpenSetting(true)} />

        <Outlet context={{ location, openSetting }} />

        {openSetting && <Setting onClose={() => setOpenSetting(false)} />}
      </div>
    </>
  );
}

export default ExpeditionPage;
