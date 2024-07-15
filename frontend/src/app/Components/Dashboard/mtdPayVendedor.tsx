import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// interface SaleData {
//   numero_vendas: number;
//   mtd_pay: string;
// }

interface MtdPayProps {
  salesData: any[] | null;
}

const MtdPayVendedor: React.FC<MtdPayProps> = ({ salesData }) => {
  if (!salesData || salesData.length === 0) {
    return <p>No sales data available</p>;
  }

  const backgroundColors = [
    "rgba(255, 99, 132)",
    "rgba(255, 159, 64)",
    "rgba(255, 205, 86)",
    "rgba(75, 192, 192)",
  ];
  // Extracting payment methods and number of sales from salesData
  // const labels = ["Credito", "Debito", "Pix", "Boleto"];
  const labels = salesData.map((label) => label.mtd_pay);
  const nVendas = salesData.map((numbers) => numbers.numero_vendas)

  const data = {
    labels: labels,
    datasets: [
      {
        axis: 'y',
        label: "Métodos de pagamento",
        data: nVendas,
        backgroundColor: backgroundColors,
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        suggestedMax: 6,
        display: true,
        categoryAxis: true,
        title: {
          display: true,
          text: "Vendas",
        },
      },
      y: {
        suggestedMax: 6,
        display: true,
        title: {
          display: true,
          text: "Número de Vendas",
        },
      },
    },
    // indexAxis: 'y',
  };

  return (
    <div className="mx-10 font-bold h-96 my-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default MtdPayVendedor;
