// import React, { useContext, useEffect } from "react";
// import baseURL from "../api/Axios";
// import { useState, useRef, useMemo, createContext } from "react";
// import { useAuth } from "../auth/AuthContext";

// const PaketContext = createContext({
//   data: [],
//   loading: true,
//   refetch: () => {},
// });
// // DIGUNAKAN UNTUK MENGAMBIL DATA PELANGGANe DARI BACKEND DAN DITAMPILKAN DI FRONTEND
// export const GetDataPaket = ({ children }: { children: React.ReactNode }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { token } = useAuth();

//   useEffect(() => {
//     const handleGetData = async () => {
//       try {
//         if (!token) return;

//         const response = await baseURL.get("/paket/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setData(response.data);
//       } catch (err) {
//         console.log("terjadi error pada saat pengambilan data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     handleGetData();
//   }, [token]);

//   return <PaketContext value={{ data, loading }}>{children}</PaketContext>;
// };

// export const usePaketData = () => useContext(PaketContext);
