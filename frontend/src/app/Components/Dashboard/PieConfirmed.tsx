import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SaleData {
  sts_venda: string;
}

interface VendasStatusPieChartProps {
  salesData: SaleData[];
}

const VendasStatusPieChart: React.FC<VendasStatusPieChartProps> = ({ salesData }) => {
  if (!salesData || salesData.length === 0) {
    return <p>No sales data available</p>;
  }

  const confirmedSales = salesData.filter(sale => sale.sts_venda === "Confirmada").length;
  const canceledSales = salesData.filter(sale => sale.sts_venda === "Cancelada").length;

  const data = {
    labels: ["Confirmadas", "Canceladas"],
    datasets: [
      {
        label: "Status das Vendas",
        data: [confirmedSales, canceledSales],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "black",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += context.raw;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="mx-10 font-bold h-96 my-6">
      <Pie data={data} options={options} />
    </div>
  );
};

export default VendasStatusPieChart;
