// MENGIRIM DATA YANG SESUAI DENGAN ROLE
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { validateRole, getAccessTokenRefresh } from "../api/AuthApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [tokenFromLogin, setTokenFromLogin] = useState(null);

  const isInisasi = useRef(false);
  // TO DO: TEMPAT MELAKUKAN PENGAMBILAN TOKEN DARI BACKEND DAN DISIMPAN KE STATE

  const getTokenRefresh = useCallback(async () => {
    try {
      // HARUS MENGEMBALIKKAN TOKEN BARU
      const data_username = localStorage.getItem("username");
      if (data_username) {
        const response_token = await getAccessTokenRefresh();

        // REQUEST SUDAH BERHASIL DAN MENGEMBALIKAN TOKEN YANG DIINGINKAN JIKA TERJADI REFRESH
        const access_token = response_token;

        // INI JUGA SUDAH BERHASIL MENGHASILKAN TOKEN ACCESS NYA
        if (access_token) {
          // INI JUGA SUDAH BERHASIL MENGEMBALIKAN ACCESS TOKEN DARI RESPON
          return access_token;
        }
      } else {
        console.log("login belum dilakukan dan username belum diset");
      }
      // SUDAH MENGEMBALIKAN TOKEN ACCESS BARU YANG SEHARUSNYA
    } catch (err) {
      console.log(
        "terjadi error pada saat melukakan pengambilan access token ketika refresh halaman",
        err,
      );
    }
  }, []);

  // MENJADIKAN REFRESH ROLE SEBAGAI GERBANG UNTUK MELANJUTKAN KE PROSES SELANJUTNYA
  const refreshRole = useCallback(async (currentToken) => {
    if (!currentToken) {
      setLoading(false);
      return;
    }

    setToken(currentToken);
    try {
      const RoleResponse = await validateRole(currentToken);

      console.log("INI RESPONSE DARI DATA VALIDASI ROLE", RoleResponse);
      const data_bersih_role = RoleResponse.data.role_user[0][0];

      if (!data_bersih_role) {
        setToken(null);
        setRole(null);
      }
      if (data_bersih_role === "ADMIN") {
        setRole("ADMIN");
      }
      if (data_bersih_role === "OPERATOR") {
        setRole("OPERATOR");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setToken(null);
        setRole(null);
      } else {
        console.log(
          "terjadi error saat pengiriman data user ke frontend dan diluar error auth",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((newToken) => {
    setTokenFromLogin(newToken);
  }, []);

  useEffect(() => {
    if (isInisasi.current) {
      return;
    }
    isInisasi.current = true;

    (async () => {
      try {
        const result_access_token = await getTokenRefresh();

        if (result_access_token) {
          // INI BETUL TOKE NYA MASIH KOSONG
          // INI SUDAH MENGEMBALIKAN ACCESS TOKEN
          await refreshRole(result_access_token);
        }
      } catch (err) {
        setToken(null);
        setRole(null);
        console.log(
          "terjadi errror pada mekanisme dalam pengirimana token dan sistem role",
          err,
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [getTokenRefresh, refreshRole]);

  // PROSES RENDER DARI LOGIN KETIKA BARU MEMBUAT TOKEN BARU
  useEffect(() => {
    if (!tokenFromLogin) {
      return;
    }

    const get_token_login = async () => {
      refreshRole(tokenFromLogin);
    };

    get_token_login();
  }, [refreshRole, tokenFromLogin]);

  const logout = useCallback(() => {
    // HARUS MENGKOSONGKAN DATA DARI TOKEN DAN ROLE KEMUDIAN DAPAT DI SETEL ULANG
    localStorage.removeItem("username");

    setRole(null);
    setToken(null);
    setLoading(true);
  }, []);

  const isAuthenticated = Boolean(role && token);

  const value = useMemo(
    () => ({
      role,
      loading,
      isAuthenticated,
      login,
      logout,
      token,
    }),
    [role, loading, isAuthenticated, token],
  );

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
