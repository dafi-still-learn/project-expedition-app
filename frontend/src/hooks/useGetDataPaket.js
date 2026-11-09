import { useEffect, useState } from "react";
import baseURL from "../api/Axios";
import { useAuth } from "../auth/AuthContext";

export const useGetDataPaket = () => {
  const [dataHarga, setDataHarga] = useState([]);
  const [dataTanggalKirim, setDataTanggalKirim] = useState([]);
  const [dataPelanggan, setDataPelanggan] = useState([]);
  // const [idPelanggan, setIdPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  console.log("isi token", token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;

        const response = await baseURL.get("/packet/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // response.data = { data: [array_baris_paket], success: true }
        // Ambil yang ada di dalam .data (array-nya)
        setDataHarga(response?.data.data_harga ?? []);
        setDataTanggalKirim(response?.data.data_tanggal ?? []);
        setDataPelanggan(response?.data.data_pelanggan ?? []);
      } catch (err) {
        console.log("terjadi error pada saat pengambilan data", err);
        setDataHarga([]); // pastikan tetap array walaupun error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return {
    dataHarga,
    dataTanggalKirim,
    dataPelanggan,
    loading,
  };
};
