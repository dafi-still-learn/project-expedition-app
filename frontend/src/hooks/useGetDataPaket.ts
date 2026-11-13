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

export const useGetDataPaket = () => {
  const [dataHarga, setDataHarga] = useState<string[]>([]);
  const [dataTanggalKirim, setDataTanggalKirim] = useState<string[]>([]);
  const [dataPelanggan, setDataPelanggan] = useState<Pelanggan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        setDataPelanggan(
          Array.isArray(payload.data_pelanggan) ? payload.data_pelanggan : [],
        );
      } catch (err) {
        console.log("terjadi error pada saat pengambilan data", err);
        setDataHarga([]);
        setDataTanggalKirim([]);
        setDataPelanggan([]);
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
