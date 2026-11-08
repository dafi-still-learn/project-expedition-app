import React, { useEffect } from "react";
import baseURL from "../api/Axios";
import { useState } from "react";

type GetDataPaketProps = {
  token: string;
};
// DIGUNAKAN UNTUK MENGAMBIL DATA PELANGGANe DARI BACKEND DAN DITAMPILKAN DI FRONTEND
export const GetDataPaket = ({
  token,
}: GetDataPaketProps): React.JSX.Element => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await baseURL.get("/paket/all");

        const data = response.data;

        setData(data);
      } catch (err) {
        console.log("terjadi error pada saat pengambilan data");
      }
    };

    if (token) {
      handleGetData();
    }
  }, [token]);

  return (
    <>
      <div>{token && <h1>{data}</h1>}</div>
    </>
  );
};
