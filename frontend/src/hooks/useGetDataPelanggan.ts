import { useEffect, useState } from "react";
import baseURL from "../api/Axios";
import { useAuth } from "../auth/AuthContext";

export type Pelanggan = {
  id?: number | string;
  nama_pelanggan?: string;
  nomor_hp?: string;
  nama_paket?: string;
  asal_pengiriman?: string;
  tujuan_pengiriman?: string;
  jumlah_paket?: number | string;
  harga_paket?: string;
};
// DIGUNKAN UNTUK MENGAMBIL DATA PELANGGAN DARI BACKEND DAN DITAMPILAKAN DI FRONTEND
export const useGetDataPelanggan = () => {
  const [dataPelanggan, setDataPelanggan] = useState<Pelanggan[]>([]);
  const [loadingPelanggan, setLoadingPelanggan] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await baseURL.get("/customers/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("data pelanggan", response.data);
        setDataPelanggan(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.log("terjadi error pada saat pengambilan data");
        setDataPelanggan([]);
      } finally {
        setLoadingPelanggan(false);
      }
    };
    handleGetData();
  }, [token]);

  return { dataPelanggan, loadingPelanggan };
};
