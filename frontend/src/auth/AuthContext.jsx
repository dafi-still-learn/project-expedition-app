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

  console.log("INI DARI AUTH CONTEXT");
  console.log("ISI TOKEN", token);
  const refreshRole = useCallback(async () => {
    if (!token) {
      setRole(null);
      setLoading(false);
      return;
    }
    try {
      const RoleResponse = await validateRole(token);
      if (RoleResponse.data.role === "ADMIN") {
        setRole("ADMIN");
        return;
      }
      if (RoleResponse.data.role === "OPERATOR") {
        setRole("OPERATOR");
        return;
      }
      setRole(null);
    } catch (err) {
      setRole(null);
      console.log("terjadi error saat pengiriman data user ke frontend", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    refreshRole();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const login = (newRole) => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  const isAuthenticated = Boolean(role);

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
