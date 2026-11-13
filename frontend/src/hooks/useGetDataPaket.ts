import { useEffect, useState } from "react";
import baseURL from "../api/Axios";
import { useAuth } from "../auth/AuthContext";

export const useGetDataPaket = () => {
  const [dataHarga, setDataHarga] = useState<string[]>([]);
  const [dataTanggalKirim, setDataTanggalKirim] = useState<string[]>([]);
  const [loadingPaket, setLoadingPaket] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) return;

        const response = await baseURL.get("/packet/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = response?.data ?? {};

        setDataHarga(
          Array.isArray(payload.data_harga) ? payload.data_harga : [],
        );
        setDataTanggalKirim(
          Array.isArray(payload.data_tanggal) ? payload.data_tanggal : [],
        );
      } catch (err) {
        console.log("terjadi error pada saat pengambilan data", err);
        setDataHarga([]);
        setDataTanggalKirim([]);
      } finally {
        setLoadingPaket(false);
      }
    };

    fetchData();
  }, [token]);

  return {
    dataHarga,
    dataTanggalKirim,
    loadingPaket,
  };
};
