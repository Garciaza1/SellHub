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

interface SaleData {
  venda_data: string;
  total_vendas: number;
  quantidade: number;
  mtd_pay: string;
  cep: string;
  sts_venda: string;
}

interface MtdPayProps {
  salesData: SaleData[];
}

const MtdPayVendedor: React.FC<MtdPayProps> = ({ salesData }) => {
  if (!salesData || salesData.length === 0) {
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

  const groupedData: { [key: string]: { [key: string]: number } } = {};

  salesData.forEach((sale) => {
    const formattedDate = formatDate(sale.venda_data);
    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = { credito: 0, debito: 0, pix: 0, boleto: 0 };
    }
    if (groupedData[formattedDate][sale.mtd_pay.toLowerCase()] !== undefined) {
      groupedData[formattedDate][sale.mtd_pay.toLowerCase()]++;
    }
  });

  const labels = Object.keys(groupedData);
  const creditoData = labels.map((label) => groupedData[label].credito);
  const debitoData = labels.map((label) => groupedData[label].debito);
  const pixData = labels.map((label) => groupedData[label].pix);
  const boletoData = labels.map((label) => groupedData[label].boleto);

  const data = {
    labels,
    datasets: [
      {
        label: "Credito",
        data: creditoData,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Debito",
        data: debitoData,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Pix",
        data: pixData,
        backgroundColor: "rgb(255, 206, 86)",
        borderColor: "rgba(255, 206, 86, 0.2)",
      },
      {
        label: "Boleto",
        data: boletoData,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
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
        suggestedMax: 6,
        display: true,
        title: {
          display: true,
          text: "Número de Vendas",
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

export default MtdPayVendedor;
