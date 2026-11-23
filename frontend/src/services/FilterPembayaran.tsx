import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import baseURL from "../api/Axios";

export const FilterPembayaran = ({ filterData }: any): React.JSX.Element => {
  const [pihakPembayaran, setPihakPembayaran] = useState<string>("");
  const [tanggalPembayaran, setTanggalPembayaran] = useState<string>("");
  const [nominalPembayaran, setNominalPembayaran] = useState<string>("");
  const [metodePembayaran, setMetodePembayaran] = useState<string>("");
  const [waktu, setWaktu] = useState<string>("");
  const { token } = useAuth();

  console.log("ini filter pengiriman");
  const handleFilterData = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (tanggalPembayaran)
      params.append("tanggal_pembayaran", tanggalPembayaran);
    if (pihakPembayaran) params.append("pihak_pembayaran", pihakPembayaran);
    if (nominalPembayaran)
      params.append("nominal_pembayaran", nominalPembayaran);
    if (metodePembayaran) params.append("metode_pembayaran", metodePembayaran);
    if (waktu) params.append("waktu", waktu);

    try {
      const queryString = params.toString();
      const response = await baseURL.get(`/pembayaran/filter?${queryString}`, {
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
      <div className="w-full h-full">
        <form onSubmit={handleFilterData} className="grid grid-colsd-8">
          <div className="flex justify-around gap-2 col-span-6">
            <label htmlFor="">
              nama pembayar
              <input
                type="text"
                onChange={(e) => setPihakPembayaran(e.target.value)}
              />
            </label>
            <label htmlFor="">
              <input
                type="text"
                onChange={(e) => setTanggalPembayaran(e.target.value)}
              />
            </label>
            <label htmlFor="">
              tipe paket
              <input
                type="text"
                onChange={(e) => setNominalPembayaran(e.target.value)}
              />
            </label>
            <label htmlFor="">
              asal kota
              <input
                type="text"
                onChange={(e) => setMetodePembayaran(e.target.value)}
              />
            </label>
          </div>
          <div className="col-span-1">
            <select name="" id="" onChange={(e) => setWaktu(e.target.value)}>
              <option value="3">3 hari</option>
              <option value="7">7 hari</option>
              <option value="14">14 hari</option>
              <option value="30">30 hari</option>
            </select>
          </div>
          <button type="submit" className="w-70 h-10 bg-red-200 col-span-1">
            filter
          </button>
        </form>
      </div>
    </>
  );
};
