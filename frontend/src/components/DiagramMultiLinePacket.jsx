import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

function DiagramMultiLinePacket({ data_item }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const data = {
      labels: ["senin", "selasa", "rabu", "kamis", "jum'at", "sabtu", "minggu"],
      datasets: [
        {
          label: "packet proses",
          data: [200, 150, 225, 215, 230, 180, 166],
          fill: false,
          borderColor: "rgb(255, 159, 64)",
          tension: 0.1,
        },
        {
          label: "packet selesai",
          data: [120, 130, 135, 177, 200, 165, 150],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
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

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
}

export default DiagramMultiLinePacket;
