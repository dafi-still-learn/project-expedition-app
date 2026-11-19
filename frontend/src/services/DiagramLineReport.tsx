import React from "react";
import { DiagramLine } from "../components/DiagramLine";
import { useGetDataPaket } from "../hooks/useGetDataPaket";
import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";

import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";

export const DiagramLineReport = (): React.JSX.Element => {
  const { dataHarga, dataTanggalKirim } = useGetDataPaket();
  const { dataPelanggan } = useGetDataPelanggan();

  const harga_pengiriman = Array.isArray(dataHarga)
    ? dataHarga.map((p: any) => {
        const raw = p ?? "0";
        console.log(raw);
        // Bersihkan format Indonesia: "Rp10.240.750,00" -> 10240750
        const cleaned = raw.replace(/[^\d,]/g, "").replace(",", ".");
        console.log(cleaned);
        return parseFloat(cleaned) || 0;
      })
    : [];

  const id_pelanggan = Array.isArray(dataPelanggan)
    ? dataPelanggan.map((p: any) => {
        const raw = p ?? "";
        console.log("data raw ", raw.id);

        return raw.id;
      })
    : [];

  return (
    <>
      <div className="shadow-lg">
        <DiagramLine data={harga_pengiriman} labels={dataTanggalKirim} />
      </div>
      <div className="shadow-lg">
        <DiagramLine data={id_pelanggan} labels={dataTanggalKirim} />
      </div>
      <div className="shadow-lg">
        <DiagramLine data={harga_pengiriman} labels={dataTanggalKirim} />
      </div>
      <div className="shadow-lg">
        <DiagramMultiLineFinansial />
      </div>
    </>
  );
};
