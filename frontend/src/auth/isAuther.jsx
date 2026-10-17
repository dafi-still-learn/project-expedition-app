// TEMPAT MELAKUKAN PEMERIKSAAN DARI ROLE DAN TOKEN
// VALIDASI TOKEN DAN ROLE UNTUK MENGAKSES HALAMAN DASHBOARD
import { Navigate, Outlet } from "react-router-dom";

import { UseAuth } from "./AuthContext";

function IsAuther() {
  const { loading, isAuthenticated } = UseAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
// MENGEMBALIKAN ROLE

export default IsAuther;
