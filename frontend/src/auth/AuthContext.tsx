// MENGIRIM DATA YANG SESUAI DENGAN ROLE
import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { validateRole, getAccessTokenRefresh } from "../api/AuthApi";

type ValueProps = {
  role: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (newTokne: string) => void;
  logout: () => void;
  token: string | null;
};
const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [tokenFromLogin, setTokenFromLogin] = useState<string | null>(null);

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

        if (!access_token) return;
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
  const refreshRole = useCallback(async (currentToken: any) => {
    if (!currentToken) {
      setLoading(false);
      return;
    }

    setToken(currentToken);
    try {
      const RoleResponse = await validateRole(currentToken);

      console.log("INI RESPONSE DARI DATA VALIDASI ROLE", RoleResponse);

      const data_bersih_role = RoleResponse?.data.role_user[0][0];

      if (!data_bersih_role) {
        setToken(null);
        setRole(null);
        setTokenFromLogin(null);

        return;
      }
      setRole(data_bersih_role);
    } catch (err) {
      if (err) {
        setToken(null);
        setRole(null);
        setTokenFromLogin(null);
      } else {
        console.log(
          "terjadi error saat pengiriman data user ke frontend dan diluar error auth",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((newToken: any) => {
    if (!newToken) return;

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

        if (!result_access_token) return;

        if (result_access_token) {
          // INI BETUL TOKE NYA MASIH KOSONG
          // INI SUDAH MENGEMBALIKAN ACCESS TOKEN
          await refreshRole(result_access_token);
        }
      } catch (err) {
        setToken(null);
        setRole(null);
        setTokenFromLogin(null);

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
    localStorage.removeItem("userId");
    localStorage.removeItem("emailUser");
    localStorage.removeItem("profilComplete");

    setRole(null);
    setToken(null);
    setLoading(true);
    setTokenFromLogin(null);
  }, []);

  const isAuthenticated = Boolean(role && token);

  const value = useMemo(
    (): ValueProps => ({
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
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("user auth sebaik berisi atau dekat dengan AuthProvider");
  } else {
    return ctx;
  }
}
