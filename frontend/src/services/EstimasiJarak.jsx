import baseURL from "../api/Axios";
import { useEffect, useState } from "react";

export const EstimasiJarak = ({
  kodeWilayahAsal,
  kodeWilayahTujuan,
  setJarakD,
}) => {
  const [jarak, setJarak] = useState("");

  console.log("ini isi dari kode wilayah asal", kodeWilayahAsal);
  console.log("ini isi dari kode wilayah tujuan", kodeWilayahTujuan);
  useEffect(() => {
    const handleEstimasiJarak = async () => {
      try {
        const response = await baseURL.get(
          `/packet/jarak_pengiriman?asal=${kodeWilayahAsal}&tujuan=${kodeWilayahTujuan}`,
        );

        const data = response.data;

        console.log("ini data estimasi jarak dari response ", data);

        setJarakD(data);

        setJarak(data);
      } catch (error) {
        console.error("Error fetching estimasi jarak: ", error);
      }
    };

    if (kodeWilayahAsal && kodeWilayahTujuan) {
      handleEstimasiJarak();
    }
  }, [kodeWilayahAsal, kodeWilayahTujuan, setJarakD]);

  return (
    <>
      <div>{jarak && <h1>{jarak} km</h1>}</div>
    </>
  );
};
