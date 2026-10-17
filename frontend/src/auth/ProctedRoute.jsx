// TEMPAT MELKAKUKAN PERLINDUNGNA ROUTER DARI MANIPULASI
import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, Loading } = UseAuth();

  if (Loading) {
    return <p>Memeriksa Authentikasi...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}
