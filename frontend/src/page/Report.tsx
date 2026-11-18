import DiagramMultiLineFinansial from "../components/DiagramMultiLinFinansial";
import { DiagramLine } from "../components/DiagramLine";
import { useGetDataPaket } from "../hooks/useGetDataPaket";
import { useGetDataPelanggan } from "../hooks/useGetDataPelanggan";
import filterReport from "../services/filterReport";
import { useState } from "react";

function Laporan() {
  const { dataHarga, dataTanggalKirim } = useGetDataPaket();
  const { dataPelanggan } = useGetDataPelanggan();
  const [topic, setTopic] = useState<string>("");
  const [waktu, setWaktu] = useState<string>("");

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

  console.log("ini isi dari id pelanggan", id_pelanggan);
  return (
    <>
      <section
        className="w-screen h-screen overflow-auto"
        id="Container-report"
      >
        <div className="w-full h-full" id="report">
          <div
            className="grid gap-6 grid-rows-5 w-full h-full"
            id="pengiriman-card"
          >
            <div>
              <filterReport />
            </div>
            <div className="row-span-4 grid grid-cols-2 gap-4 overflow-auto">
              <div className="shadow-lg">
                <DiagramLine
                  data={harga_pengiriman}
                  labels={dataTanggalKirim}
                />
              </div>
              <div className="shadow-lg">
                <DiagramLine data={id_pelanggan} labels={dataTanggalKirim} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Laporan;
