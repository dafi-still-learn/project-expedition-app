import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import baseURL from "../api/Axios";
import { Filter } from "@boxicons/react";

export const FitlerDelivery = ({ filterData }: any): React.JSX.Element => {
  const [namaPengirim, setNamaPengirim] = useState<string>("");
  const [namaPaket, setNamaPaket] = useState<string>("");
  const [tipePaket, setTipePaket] = useState<string>("");
  const [asalKota, setAsalKota] = useState<string>("");
  const [tujuanKota, setTujuanKota] = useState<string>("");
  const [waktu, setWaktu] = useState<string>("");
  const { token } = useAuth();

  const handleFilterData = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (namaPengirim) params.append("nama_pengirim", namaPengirim);
    if (namaPaket) params.append("nama_paket", namaPaket);
    if (tipePaket) params.append("tipe_paket", tipePaket);
    if (asalKota) params.append("asal_kota", asalKota);
    if (tujuanKota) params.append("tujuan_kota", tujuanKota);
    if (waktu) params.append("waktu", waktu);

    try {
      const queryString = params.toString();
      const response = await baseURL.get(`/delivery/filter?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      filterData(response.data);
    } catch (err) {
      console.log("terjadi error saat mengambil data pengiriman ", err);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleFilterData}>
          <div>
            <label htmlFor="">
              nama pengirim
              <input
                type="text"
                onChange={(e) => setNamaPengirim(e.target.value)}
              />
            </label>
            <label htmlFor="">
              nama paket
              <input
                type="text"
                onChange={(e) => setNamaPaket(e.target.value)}
              />
            </label>
            <label htmlFor="">
              tipe paket
              <input
                type="text"
                onChange={(e) => setTipePaket(e.target.value)}
              />
            </label>
            <label htmlFor="">
              asal kota
              <input
                type="text"
                onChange={(e) => setAsalKota(e.target.value)}
              />
            </label>
            <label htmlFor="">
              tujuan kota
              <input
                type="text"
                onChange={(e) => setTujuanKota(e.target.value)}
              />
            </label>
          </div>
          <div>
            <select name="" id="" onChange={(e) => setWaktu(e.target.value)}>
              <option value="3">3 hari</option>
              <option value="7">7 hari</option>
              <option value="14">14 hari</option>
              <option value="30">30 hari</option>
            </select>
          </div>
          <button type="submit">filter</button>
        </form>
      </div>
    </>
  );
};
