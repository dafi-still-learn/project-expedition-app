import baseURL from "../api/Axios";
import { useState, useEffect } from "react";

export const EstimasiWaktuPengiriman = ({
  jarak,
  jalur,
  setTanggalPengiriman,
  setTanggalSampai,
}) => {
  const [waktu, setWaktu] = useState("");

  useEffect(() => {
    const handleEstimasiWaktuPengiriman = async () => {
      try {
        const response = await baseURL.get(
          `/packet/waktu_pengiriman?jarak=${jarak}&jalur=${jalur}`,
        );

        const data = response.data;

        console.log("ini data estimasi waktu pengiriman dari response ", data);

        setTanggalPengiriman(data);
        setTanggalSampai(data);

        setWaktu(data);
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
