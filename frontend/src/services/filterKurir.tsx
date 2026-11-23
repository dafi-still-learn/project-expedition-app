import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import baseURL from "../api/Axios";

export const FilterKurir = ({ filterData }: any): React.JSX.Element => {
  const [namaKurir, setNamaKurir] = useState<string>("");
  const [jalurKurir, setJalurKurir] = useState<string>("");
  const [daerahKurir, setDaerahKurir] = useState<string>("");
  const [statusKurir, setStatusKurir] = useState<string>("");
  const [ratingKurir, setRatingKurir] = useState<string>("");
  const [alamatKurir, setAlamatKurir] = useState<string>("");
  const { token } = useAuth();

  console.log("ini filter pengiriman");
  const handleFilterData = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (namaKurir) params.append("nama_pengirim", namaKurir);
    if (jalurKurir) params.append("nama_paket", jalurKurir);
    if (daerahKurir) params.append("tipe_paket", daerahKurir);
    if (statusKurir) params.append("asal_kota", statusKurir);
    if (ratingKurir) params.append("tujuan_kota", ratingKurir);
    if (alamatKurir) params.append("alamat_kurir", alamatKurir);

    try {
      const queryString = params.toString();
      const response = await baseURL.get(`/kurir/filter?${queryString}`, {
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
          <div className="flex justify-around gap-2 col-span-7">
            <label htmlFor="">
              nama kurir
              <input
                type="text"
                onChange={(e) => setNamaKurir(e.target.value)}
              />
            </label>
            <label htmlFor="">
              jalur kurir
              <input
                type="text"
                onChange={(e) => setJalurKurir(e.target.value)}
              />
            </label>
            <label htmlFor="">
              daerah kurir
              <input
                type="text"
                onChange={(e) => setDaerahKurir(e.target.value)}
              />
            </label>
            <label htmlFor="">
              status kurir
              <input
                type="text"
                onChange={(e) => setStatusKurir(e.target.value)}
              />
            </label>
            <label htmlFor="">
              rating kurir
              <input
                type="text"
                onChange={(e) => setRatingKurir(e.target.value)}
              />
            </label>
            <label htmlFor="">
              alamat kurir
              <input
                type="text"
                onChange={(e) => setAlamatKurir(e.target.value)}
              />
            </label>
          </div>
          <button type="submit" className="w-70 h-10 bg-red-200 col-span-1">
            filter
          </button>
        </form>
      </div>
    </>
  );
};
