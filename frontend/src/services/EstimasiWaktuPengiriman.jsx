import baseURL from "../api/Axios";
import { useState, useEffect } from "react";

export const EstimasiWaktuPengiriman = ({ jarak, jalur }) => {
  const [waktu, setWaktu] = useState("");

  useEffect(() => {
    const handleEstimasiWaktuPengiriman = async () => {
      try {
        const response = await baseURL.get(
          `/packet/waktu_pengiriman?jarak=${jarak}&jalur=${jalur}`,
        );

        const data = response.data;

        console.log("ini data estimasi waktu pengiriman dari response ", data);

        setWaktu(data.data);
      } catch (error) {
        console.error("Error fetching estimasi waktu pengiriman: ", error);
      }
    };

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
