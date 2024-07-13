import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement, // Importe BarElement para registrar o gráfico de barras
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

// Register Chart.js components, incluindo BarElement
ChartJS.register(
  BarElement, // Certifique-se de incluir BarElement para gráfico de barras
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface SaleData {
  venda_data: string;
  total_vendas: number;
  quantidade: number;
  mtd_pay: string;
  cep: string;
  sts_venda: string;
}

interface PorDiaProps {
  salesData: SaleData[];
}
const PorDiaVendedor: React.FC<PorDiaProps> = ({ salesData }) => {
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

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "Total de Vendas em Valor",
        data: salesData.map((sale) => sale.total_vendas),
        backgroundColor: "rgb(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      }
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Data",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Total Vendas Valor",
        },
      },
    },
  };

  return (
    <div className="mx-10 font-bold h-96 my-6" >
      <Bar data={data} options={options} />
    </div>
  );
};

export default PorDiaVendedor;
