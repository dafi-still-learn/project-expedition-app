import { useEffect, useState } from "react";
import baseURL from "../api/Axios";
import { useAuth } from "../auth/AuthContext";
import { data } from "react-router-dom";

type dataPaketProps = {
  id: number;
  nama_paket: string;
  nama_pengirim: string;
  jenis_paket: string;
  jumlah_paket: number;
  asal_paket: string;
  tujuan_paket: string;
  berat_paket: number;
  jalur_pengiriman: string;
  jarak_paket: number;
  nomor_hp_pengirim: string;
  nomor_hp_penerima: string;
  tanggal_pengiriman: Date;
  tanggal_sampai: Date;
  harga_pengiriman: string;
};

export const useGetDataPaket = () => {
  const [dataPaket, setDataPaket] = useState<dataPaketProps[]>([]);
  const [loadingPaket, setLoadingPaket] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      setLoadingPaket(false);

      return;
    }

    const fetchData = async () => {
      try {
        if (!token) return;

        const response = await baseURL.get("/packet/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDataPaket(response.data ?? []);
      } catch (err) {
        console.log("terjadi error pada saat pengambilan data", err);
        setDataPaket([]);
      } finally {
        setLoadingPaket(false);
      }
    };

    fetchData();
  }, [token]);

  return {
    dataPaket,
    loadingPaket,
  };
};
