import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

function DiagramMultiLineFinansial({ data_item }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const data = {
      labels: ["senin", "selasa", "rabu", "kamis", "jum'at", "sabtu", "minggu"],
      datasets: [
        {
          label: "Dana sekarang",
          data: [123, 140, 135, 142, 150, 138, 160],
          fill: false,
          borderColor: "rgb(255, 159, 64)",
          tension: 0.1,
        },
        {
          label: "Dana pemasukkan",
          data: [60, 66, 58, 70, 66, 72, 75],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
        {
          label: "dana pengeluaran",
          data: [40, 50, 47, 49, 60, 54, 65],
          fill: false,
          borderColor: "rgb(255, 205, 86)",
          tension: 0.1,
        },
      ],
    };
    const chart = new Chart(canvas, {
      type: "line",
      data: data,
    });

    return () => chart.destroy();
  }, [data_item]);
  return <canvas ref={canvasRef} className="h-full w-full"></canvas>;
}

export default DiagramMultiLineFinansial;
