import baseURL from "../api/Axios";
import { useEffect, useState } from "react";

export const EstimasiHargaPengiriman = ({
  berat,
  jarak,
  jalur,
  jenis,
  setHargaPengiriman,
}) => {
  const [harga, setHarga] = useState("");

  console.log("isi berat", berat);
  console.log("isi jarak", jarak);
  console.log("isi jalur", jalur);
  console.log("isi jenis", jenis);
  useEffect(() => {
    const handleHargaPengiriman = async () => {
      try {
        const response = await baseURL.get(
          `/packet/harga_pengiriman?berat=${berat}&jarak=${jarak}&jalur=${jalur}&jenis=${jenis}`,
        );

        const data = response.data;

        console.log("ini data harga pengiriman dari response ", data);

        setHargaPengiriman(data);
        setHarga(data);
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
