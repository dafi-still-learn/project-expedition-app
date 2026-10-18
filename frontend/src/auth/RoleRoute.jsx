// TEMPAT MELAKUKAN ROUTE SESUAI ROLE
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RoleRoute({ allowedRoles }) {
  const { role, loading } = useAuth();

  console.log("Ini dari role router");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
