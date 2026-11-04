import Barcode from "react-barcode";
import baseURL from "../api/Axios";
import { useEffect, useState } from "react";

export const GenerateBarcode = ({ id, pengirim }) => {
  const [dataBarcode, setDataBarcode] = useState("");

  useEffect(() => {
    const handleGenerateBarcode = async () => {
      try {
        const response = await baseURL.get(
          `/packet/no_resi?id=${id}&pengirim=${pengirim}`,
        );

        const data = response.data;

        setDataBarcode(data);
        console.log("ini isi dari data barcode dari backend", data);
      } catch (err) {
        console.log(
          "terjadi error pada saat mengambil dan mencari data dari backend ",
          err,
        );
      }
    };

    if (id) {
      handleGenerateBarcode();
    }
  }, [id]);

  return (
    <>
      <div>
        <Barcode value={dataBarcode} format="CODE128" width={2} height={100} />
      </div>
    </>
  );
};
