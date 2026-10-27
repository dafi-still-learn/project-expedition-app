// TEMPAT MELAKUKAN PEMERIKSAAN DARI ROLE DAN TOKENADMIN
// VALIDASI TOKEN DAN ROLE UNTUK MENGAKSES HALAMAN DASHBOARD
import { Navigate, Outlet } from "react-router-dom";
import "../index.css";
import { useAuth } from "./AuthContext";

function IsAuther() {
  const { loading, isAuthenticated } = useAuth();
  console.count("isAuther di-render");
  if (loading) {
    return <div className="text-loading">Loading is auther...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}
// MENGEMBALIKAN ROLE

export default IsAuther;
