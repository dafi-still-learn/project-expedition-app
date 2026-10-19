// MENGIRIM DATA YANG SESUAI DENGAN ROLE
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { validateRole } from "../api/AuthApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const refreshRole = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const RoleResponse = await validateRole(token);
      setRole((prev) => (prev === RoleResponse ? prev : RoleResponse));
      const data_bersih_role = RoleResponse.data.role_user[0][0];
      console.log("ini isi role response", data_bersih_role);

      if (data_bersih_role === "ADMIN") {
        setRole("ADMIN");
        return;
      }
      if (data_bersih_role == "OPERATOR") {
        setRole("OPERATOR");
        return;
      }
    } catch (err) {
      setRole(null);
      console.log("terjadi error saat pengiriman data user ke frontend", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshRole();
  }, [refreshRole]);

  const login = useCallback((role) => {
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    setToken(null);
  }, []);

  const isAuthenticated = Boolean(role && token);

  const value = {
    role,
    loading,
    isAuthenticated,
    login,
    logout,
    setToken,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("user auth sebaik berisi atau dekat dengan AuthProvider");
  } else {
    return ctx;
  }
}
