// TEMPAT MELKAKUKAN PERLINDUNGNA ROUTER DARI MANIPULASI
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  console.log("ini dari proctedRouter");

  const { isAuthenticated, loading } = useAuth();

  console.log("INI HASIL LOADING DARI PROCTEDROUTER", loading);
  console.log("INI HASIL isAuthenticated DARI PROCTEDROUTER", isAuthenticated);
  if (loading) {
    return <p>Memeriksa Authentikasi...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}
