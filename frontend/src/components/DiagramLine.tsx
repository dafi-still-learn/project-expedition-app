import Chart, { ChartData, ChartOptions } from "chart.js/auto";
import { useEffect, useRef } from "react";
import { GetDataPaket } from "../services/GetDataPaket";

interface DiagramLineProps {
  token: string;
  labels?: string[];
  datasetData?: number[];
}

export const DiagramLine = ({
  token: sting,
  labels = [],
  datasetData = [],
}: DiagramLineProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const data: ChartData<"line"> = {
      labels: labels,
      datasets: [
        {
          label: "grafik pemasukkan",
          data: datasetData,
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
      data: data,
      options: options,
    });

    return () => chart.destroy();
  }, [labels, datasetData]);

  return <canvas ref={canvasRef}></canvas>;
};
