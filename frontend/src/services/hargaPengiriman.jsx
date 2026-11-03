import baseURL from "../api/Axios";
import { useEffect, useState } from "react";

export const HargaPengiriman = ({ berat, jarak, jalur, jenis }) => {
  const [harga, setHarga] = useState("");

  useEffect(() => {
    const handleHargaPengiriman = async () => {
      try {
        const response = await baseURL.get(
          `/packet/harga_pengiriman?berat=${berat}&jarak=${jarak}&jalur=${jalur}&jenis=${jenis}`,
        );

        const data = response.data;

        console.log("ini data harga pengiriman dari response ", data);

        setHarga(data.data);
      } catch (error) {
        console.error("Error fetching harga pengiriman: ", error);
      }
    };

    if (berat && jarak && jalur && jenis) {
      handleHargaPengiriman();
    }
  }, [berat, jarak, jalur, jenis]);

  return (
    <>
      <div>{harga && <h1>{harga}</h1>}</div>
    </>
  );
};
