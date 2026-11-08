import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { useGetDataPaket } from "../hooks/useGetDataPaket";

export const DiagramLine = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { dataHarga, dataTanggalKirim, loading } = useGetDataPaket();

  // Safety: pastikan data adalah array sebelum .map

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
  console.log(harga_pengiriman);
  console.log("isi dari data", dataHarga);
  console.log("isi data tanggal", dataTanggalKirim);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (loading) return;

    const dataChart: ChartData<"line"> = {
      labels: dataTanggalKirim,
      datasets: [
        {
          label: "grafik pemasukkan",
          data: harga_pengiriman,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const chart = new Chart(canvas, {
      type: "line",
      data: dataChart,
      options: options,
    });

    return () => chart.destroy();
  }, [dataTanggalKirim, harga_pengiriman, loading]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      style={{ minHeight: "200px" }}
    >
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
