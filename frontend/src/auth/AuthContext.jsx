// MENGIRIM DATA YANG SESUAI DENGAN ROLE
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { validateRole, getAccessTokenRefresh } from "../api/AuthApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const isInisasi = useRef(false);
  // TO DO: TEMPAT MELAKUKAN PENGAMBILAN TOKEN DARI BACKEND DAN DISIMPAN KE STATE

  const getTokenRefresh = useCallback(async () => {
    try {
      // HARUS MENGEMBALIKKAN TOKEN BARU
      const response_token = await getAccessTokenRefresh();

      // REQUEST SUDAH BERHASIL DAN MENGEMBALIKAN TOKEN YANG DIINGINKAN JIKA TERJADI REFRESH
      const access_token = response_token;
      console.log(
        "ISI DARI REPSONSE GET ACCESS TOKEN DARI AUTH CONTEXTS === ",
        response_token,
      );
      console.log("ISI DARI ACCESS TOKEN DARI REFRESH", access_token);
      if (access_token) {
        console.log(
          "INI DARI GET ACCESS TOKEN DARI BACKEND KETIKA MELAKUKAN REFRESH HALAMAN",
          access_token,
        );
        setToken(access_token);
        return access_token;
      }
      return;
    } catch (err) {
      console.log(
        "terjadi error pada saat melukakan pengambilan access token ketika refresh halaman",
        err,
      );
    }
  }, []);

  const refreshRole = useCallback(async (currentToken) => {
    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const RoleResponse = await validateRole(currentToken);
      setRole((prev) => (prev === RoleResponse ? prev : RoleResponse));
      const data_bersih_role = RoleResponse.data.role_user[0][0];
      console.log("ini isi role response", data_bersih_role);

      if (data_bersih_role === "ADMIN") {
        setRole("ADMIN");
        return;
      }
      if (data_bersih_role === "OPERATOR") {
        setRole("OPERATOR");
        return;
      }
    } catch (err) {
      setRole(null);
      console.log("terjadi error saat pengiriman data user ke frontend", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInisasi.current) {
      return;
    }

    isInisasi.current = true;
    try {
      const appInit = async () => {
        const result_access_token = await getTokenRefresh();

        if (result_access_token) {
          await refreshRole(result_access_token);
        } else {
          setLoading(false);
        }
      };

      appInit();
    } catch (err) {
      console.log(
        "terjadi error pada mekanisme penyegaran halaman website",
        err,
      );
    } finally {
      setLoading(false);
    }
  }, [refreshRole, getTokenRefresh]);

  const login = useCallback((role) => {
    setRole(role);
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    setToken(null);
    setLoading(false);
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
