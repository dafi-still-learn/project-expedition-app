// TEMPAT MELAKUKAN ROUTE SESUAI ROLE
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RoleRoute({ allowedRoles }) {
  const { role, loading } = useAuth();
  console.count("RolRouter di-render");
  const hasAccess = role && allowedRoles.includes(role);
  console.log("INI HASIL DARI HAS ACCESS DI ROLE ROUTER", hasAccess);
  console.log("INI ADALAH ROLE YANG DIIZANKAN UNTUK MENGAKSES", allowedRoles);
  if (loading) {
    return <div>Loading di role router...</div>;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
