// TEMPAT MELKAKUKAN PERLINDUNGNA ROUTER DARI MANIPULASI
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../index.css";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  console.count("ProtectedRoute di-render");

  if (loading) {
    return (
      <p className="text-loading">
        Memeriksa Authentikasi di procted router...
      </p>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}
