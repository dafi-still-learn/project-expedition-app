import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

function DiagramFinansial({ item_data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const data = {
      labels: ["sisa saldo", "pemasukkan", "pengeluaran"],
      datasets: [
        {
          label: "Diagram Expedition",
          data: item_data,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        },
      ],
    };
    const chart = new Chart(canvas, {
      type: "doughnut",
      data: data,
    });

    return () => chart.destroy();
  }, [item_data]);
  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      id="diagram_pie_finansial"
    ></canvas>
  );
}

export default DiagramFinansial;
