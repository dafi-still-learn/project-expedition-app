// TEMPAT MELAKUKAN ROUTE SESUAI ROLE
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RoleRoute({ allowedRoles }: any) {
  const { role, loading } = useAuth();

  console.count("RolRouter di-render");

  const hasAccess = role && allowedRoles.includes(role);

  console.log("INI HASIL DARI HAS ACCESS DI ROLE ROUTER", hasAccess);

  if (loading) {
    return <div className="text-loading">Loading di role router...</div>;
  }

  if (!role) {
    console.log("INI DARI ROLE ROUTE");
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    console.log("INI DARI PERIZINAN ROLE UNTUK ROUTER");
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
