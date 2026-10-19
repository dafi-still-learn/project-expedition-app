// TEMPAT MELAKUKAN ROUTE SESUAI ROLE
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RoleRoute({ allowedRoles }) {
  const { role, loading } = useAuth();

  const hasAccess = role && allowedRoles.includes(role);
  console.log("Ini dari role router");
  console.log("INI HASIL ROLE DARI ROLEROUTER", loading);
  console.log("INI HASIL LOADING DARI ROLEROUTER", loading);
  console.log("INI HASIL DARI HAS ACCESS DI ROLE ROUTER", hasAccess);
  console.log("INI ADALAH ROLE YANG DIIZANKAN UNTUK MENGAKSES", allowedRoles);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
