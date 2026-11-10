import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
import { useGetDataPaket } from "../hooks/useGetDataPaket";

type DiagramLineProps = {
  labels: any;
  data: any;
};
export const DiagramLine = ({
  labels,
  data,
}: DiagramLineProps): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Safety: pastikan data adalah array sebelum .map
  useEffect(() => {
    const canvas = canvasRef.current;
    setLoading(false);
    if (!canvas) return;

    if (loading) return;

    const dataChart: ChartData<"line"> = {
      labels: labels,
      datasets: [
        {
          label: "grafik pemasukkan",
          data: data,
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
  }, [labels, data, loading]);

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
