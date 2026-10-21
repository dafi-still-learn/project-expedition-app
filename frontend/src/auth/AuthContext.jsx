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

      // SUDAH MENGEMBALIKAN TOKEN ACCESS BARU YANG SEHARUSNYA
      const response_token = await getAccessTokenRefresh();

      // REQUEST SUDAH BERHASIL DAN MENGEMBALIKAN TOKEN YANG DIINGINKAN JIKA TERJADI REFRESH
      const access_token = response_token;

      // INI JUGA SUDAH BERHASIL MENGHASILKAN TOKEN ACCESS NYA
      console.log(
        "ISI DARI REPSONSE GET ACCESS TOKEN DARI AUTH CONTEXTS === ",
        response_token,
      );
      if (access_token) {
        // INI JUGA SUDAH BERHASIL MENGEMBALIKAN ACCESS TOKEN DARI RESPON
        console.log(
          "INI DARI GET ACCESS TOKEN DARI BACKEND KETIKA MELAKUKAN REFRESH HALAMAN",
          access_token,
        );
        return access_token;
      }
    } catch (err) {
      console.log(
        "terjadi error pada saat melukakan pengambilan access token ketika refresh halaman",
        err,
      );
    }
  }, []);

  // MENJADIKAN REFRESH ROLE SEBAGAI GERBANG UNTUK MELANJUTKAN KE PROSES SELANJUTNYA
  const refreshRole = useCallback(async (currentToken) => {
    console.log("INI DARI REFRESH ROLE");
    if (!currentToken) {
      setLoading(false);
      return;
    }

    setToken(currentToken);
    console.log("ini isi role response", currentToken);
    try {
      const RoleResponse = await validateRole(currentToken);

      console.log("INI RESPONSE DARI DATA VALIDASI ROLE", RoleResponse);
      const data_bersih_role = RoleResponse.data.role_user[0][0];

      if (!data_bersih_role) {
        setToken(null);
        setRole(null);
      }

      console.log("isi dari data bersih role dari backend", data_bersih_role);
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
    setRole(null);
    setToken(null);
    setLoading(false);
  }, []);

  const isAuthenticated = Boolean(role && token);

  const value = useMemo(
    () => ({
      role,
      loading,
      isAuthenticated,
      login,
      logout,
      setToken,
      token,
      refreshRole,
    }),
    [
      role,
      loading,
      isAuthenticated,
      login,
      logout,
      setToken,
      token,
      refreshRole,
    ],
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
