import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
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

interface DoDiaProps {
  salesData: SaleData[];
}

const QntdXvalor: React.FC<DoDiaProps> = ({ salesData }) => {
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

  const data: ChartData<"bar"> = {
    labels: formattedDates,
    datasets: [
      {
        type: 'bar' as const,
        label: "Total Vendas Valor",
        data: salesData.map((sale) => sale.total_vendas),
        backgroundColor: "rgb(75, 192, 192, 0.6)",
        borderColor: "blue",
      },
      // {
      //   type: 'line',
      //   label: "Quantidade Total x10",
      //   data: salesData.map((sale) => sale.quantidade * 10),
      //   backgroundColor: "red",
      //   borderColor: "red",
      // },
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
          text: "Total Vendas",
        },
      },
    },
  };

  return (
    <div className="mx-10 font-bold h-96 my-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default QntdXvalor;
