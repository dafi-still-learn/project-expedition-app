import baseURL from "../api/Axios";
import React, { useState, useEffect } from "react";

type EstimasiWaktuPengiriman = {
  jarak: number;
  jalur: string;
  setTanggalPengiriman: (value: string) => void;
  setTanggalSampai: (value: string) => void;
};

export const EstimasiWaktuPengiriman = ({
  jarak,
  jalur,
  setTanggalPengiriman,
  setTanggalSampai,
}: EstimasiWaktuPengiriman): React.JSX.Element => {
  const [waktu, setWaktu] = useState("");

  useEffect(() => {
    const handleEstimasiWaktuPengiriman = async () => {
      try {
        const response = await baseURL.get(
          `/packet/waktu_pengiriman?jarak=${jarak}&jalur=${jalur}`,
        );

        const data = response.data;
        const berangkat =
          typeof data === "string" ? data : (data?.waktu_berangkat ?? "");
        const sampai =
          typeof data === "string" ? data : (data?.waktu_sampai ?? "");

        console.log("ini data estimasi waktu pengiriman dari response ", data);

        setTanggalPengiriman(berangkat);
        setTanggalSampai(sampai);

        setWaktu(sampai);
      } catch (error) {
        console.error("Error fetching estimasi waktu pengiriman: ", error);
      }
    };

    console.log("isi jarak", jarak);
    console.log("isi jalur", jalur);

    if (jarak && jalur) {
      handleEstimasiWaktuPengiriman();
    }
  }, [jarak, jalur]);

  return (
    <>
      <div>{waktu && <h1>{waktu}</h1>}</div>
    </>
  );
};
