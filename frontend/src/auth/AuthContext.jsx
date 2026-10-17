// MENGIRIM DATA YANG SESUAI DENGAN ROLE
import { useState, createContext, useEffect, useContext } from "react";
import { validateRole } from "../api/AuthApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshRole = async () => {
    setLoading(true);

    try {
      const adminResponse = await validateRole("admin");

      if (adminResponse.data.role === "admin") {
        setRole("admin");
        return;
      }
      const userResponse = await validateRole("user");

      if (userResponse.data.role === "user") {
        setRole("user");
        return;
      }
    } catch (error) {
      console.error("Error occurred while validating role:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshRole;
  }, []);

  const login = () => {
    setRole("user");
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function UseAuth() {
  return useContext(AuthContext);
}
