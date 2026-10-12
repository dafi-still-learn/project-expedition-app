// TEMPAT MELKAKUKAN PERLINDUNGNA ROUTER DARI MANIPULASI
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, Loading } = useAuth();

  if (Loading) {
    return <p>Memeriksa Authentikasi...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}
