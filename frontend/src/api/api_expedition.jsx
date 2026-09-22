// TEMPAT MENAMPILKAN DATA PENTING DARI DATABASE
import { Outlet } from "react-router-dom";
// import { useState } from "react";
import { useLocation } from "react-router-dom";
function ExpeditionPage() {
  const location = useLocation();
  //   const [profil, setProfil] = useState(null);

  return (
    <>
      <Outlet context={location} />
    </>
  );
}

export default ExpeditionPage;
