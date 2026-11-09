import Barcode from "react-barcode";
import baseURL from "../api/Axios";
import React, { useEffect, useState } from "react";

type GenerateBarcodeProps = {
  id: number;
  pengirim: string;
};

export const GenerateBarcode = ({
  id,
  pengirim,
}: GenerateBarcodeProps): React.JSX.Element => {
  const [dataBarcodeStatus, setDataBarcodeStatus] = useState("");

  useEffect(() => {
    const handleGenerateBarcode = async () => {
      try {
        const response = await baseURL.get(
          `/packet/no_resi?id=${id}&pengirim=${pengirim}`,
        );

        setDataBarcodeStatus(response?.data.status);
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
      <div className="flex justify-center">
        <Barcode
          value={dataBarcodeStatus}
          format="CODE128"
          width={2}
          height={100}
        />
      </div>
    </>
  );
};
