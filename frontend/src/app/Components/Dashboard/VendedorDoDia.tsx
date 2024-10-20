import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// interface SaleData {
//   venda_data: string;
//   total_vendas: number;
//   quantidade: number;
//   mtd_pay: string;
//   cep: string;
//   sts_venda: string;
// }

interface DoDiaProps {
  salesData: any[] | null;
}
const DoDiaVendedor: React.FC<DoDiaProps> = ({ salesData }) => {
  if (!salesData) {
    return <p>No sales data available</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const MyDateString =
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear();
    return MyDateString;
  };
  const formattedDates = salesData.map((sale) => formatDate(sale.venda_data));

  const data: ChartData<"line"> = {
    labels: formattedDates,
    datasets: [
      {
        label: "Total Vendas Quantidade",
        data: salesData.map((sale) => sale.quantidade),
        fill: false,
        backgroundColor: "rgb(239, 0, 0)",
        borderColor: "rgba(239, 0, 0, 0.2)",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animations: {
      tension: {
        duration: 2000,
        easing: "easeInOutQuad",
        from: 0.4,
        to: 0.2,
        loop: true,
      }, // Set tension between 0 (no tension) and 1 (high tension)
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        suggestedMax: 15,
        display: true,
        title: {
          display: true,
          text: "Total Vendas Quantidade",
        },
      },
    },
  };

  return (
    <div className="mx-10 font-bold h-96 my-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default DoDiaVendedor;
