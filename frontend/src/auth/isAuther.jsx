// TEMPAT MELAKUKAN PEMERIKSAAN DARI ROLE DAN TOKEN
// VALIDASI TOKEN DAN ROLE UNTUK MENGAKSES HALAMAN DASHBOARD
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./AuthContext";

function IsAuther() {
  console.log("ini dari is Auther");
  const { loading, isAuthenticated } = useAuth();

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
