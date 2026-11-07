import baseURL from "../api/Axios";
import React, { useEffect, useState } from "react";

type EstimasiHargaPengirimanProps = {
  berat: number;
  jarak: number;
  jalur: string;
  jenis: string;
  setHargaPengiriman: (harga: string) => void;
};

export const EstimasiHargaPengiriman = ({
  berat,
  jarak,
  jalur,
  jenis,
  setHargaPengiriman,
}: EstimasiHargaPengirimanProps): React.JSX.Element => {
  const [harga, setHarga] = useState("");

  console.log("isi berat", berat);
  console.log("isi jarak", jarak);
  console.log("isi jalur", jalur);
  console.log("isi jenis", jenis);
  useEffect(() => {
    const handleHargaPengiriman = async () => {
      try {
        const response = await baseURL.get<{ harga: string }>(
          `/packet/harga_pengiriman?berat=${berat}&jarak=${jarak}&jalur=${jalur}&jenis=${jenis}`,
        );

        const data = response.data;
        const hargaText = typeof data === "string" ? data : (data?.harga ?? "");

        console.log("ini data harga pengiriman dari response ", data);

        console.log("bentuk data dari jarka");

        setHargaPengiriman(hargaText);
        setHarga(hargaText);
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
