import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

function DiagramFinansialBar({ item_data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const data = {
      labels: ["semuanya", "baru masuk", "sudah selesai"],
      datasets: [
        {
          label: "jumlah paket",
          data: item_data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const chart = new Chart(canvas, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [item_data]);
  return <canvas ref={canvasRef}></canvas>;
}

export default DiagramFinansialBar;
