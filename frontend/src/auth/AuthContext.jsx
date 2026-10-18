// MENGIRIM DATA YANG SESUAI DENGAN ROLE
import {
  useState,
  createContext,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { validateRole } from "../api/AuthApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  print("INI DARI AUTH CONTEXT");
  const refreshRole = useCallback(async () => {
    if (!token) {
      setRole(null);
    }

    try {
      const RoleResponse = await validateRole(token);
      console.log("ini role response", RoleResponse);
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
    refreshRole;
  }, [refreshRole]);

  const login = (newRole) => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  const isauthenticated = Boolean(role);

  const value = {
    role,
    loading,
    isauthenticated,
    login,
    logout,
    refreshRole,
    setToken,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function UseAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("user auth sebaik berisi atau dekat dengan AuthProvider");
  } else {
    return ctx;
  }
}
