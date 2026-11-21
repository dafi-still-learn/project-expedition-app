import React from "react";
import { DiagramLine } from "../components/DiagramLine";
import { useGetDataPaket } from "../hooks/useGetDataPaket";
import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";

import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";

export const DiagramLineReport = (): React.JSX.Element => {
  const { dataPaket } = useGetDataPaket();
  const { dataPelanggan } = useGetDataPelanggan();

  const harga_pengiriman = Array.isArray(
    dataPaket.map((item) => item.harga_pengiriman),
  )
    ? dataPaket.map((p) => {
        const raw = String(p.harga_pengiriman ?? "0");
        // Bersihkan format Indonesia: "Rp10.240.750,00" -> 10240750
        const cleaned = raw.replace(/[^\d,]/g, "").replace(",", ".");
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
        <DiagramLine
          data={harga_pengiriman}
          labels={dataPaket.map((item) =>
            new Date(item.tanggal_pengiriman).toLocaleDateString("id-ID"),
          )}
        />
      </div>
      <div className="shadow-lg">
        <DiagramLine
          data={id_pelanggan}
          labels={dataPaket.map((item) =>
            new Date(item.tanggal_pengiriman).toLocaleDateString("id-ID"),
          )}
        />
      </div>
      <div className="shadow-lg">
        <DiagramLine
          data={harga_pengiriman}
          labels={dataPaket.map((item) =>
            new Date(item.tanggal_pengiriman).toLocaleDateString("id-ID"),
          )}
        />
      </div>
      <div className="shadow-lg">
        <DiagramMultiLineFinansial />
      </div>
    </>
  );
};
