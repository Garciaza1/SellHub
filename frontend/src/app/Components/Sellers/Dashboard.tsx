"use client";
import React, { useState, useEffect } from "react";
import {
  getDataVendedorPorDia,
  getDataVendedorDoDia,
} from "../../lib/helpers/GetDashboard";
import DoDiaVendedor from "../Dashboard/VendedorDoDia";
import PorDiaVendedor from "../Dashboard/VendedorPorDia";
import MtdPayVendedor from "../Dashboard/mtdPayVendedor";
import VendasStatusPieChart from "../Dashboard/PieConfirmed";
import VendasMap from "../Dashboard/VendaMap";

interface DashboardProps {
  user_id: string | undefined;
}

const Dashboard: React.FC<DashboardProps> = ({ user_id }) => {
  const [vendasDoDia, setVendasDoDia] = useState([]);
  const [vendasPorDia, setVendasPorDia] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const FetchVendasDoDia = async () => {
      try {
        const doDia = await getDataVendedorPorDia(user_id);
        const response = doDia;
        setVendasPorDia(response);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      }
    };
    const FetchVendasPorDia = async () => {
      try {
        const porDia = await getDataVendedorDoDia(user_id);
        const response = porDia;
        setVendasDoDia(response);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      }
    };
    FetchVendasDoDia();
    FetchVendasPorDia();
  }, [user_id]);

  return (
    <div className="container bg-gray-500 rounded-xl">
      {error}
      <div className="flex justify-center text-center">
        <p className="text-5xl font-bold text-stone-200 mt-10 underline decoration-red-400">
          DASHBOARD
        </p>
      </div>
      <section className="flex justify-between text-center bg-cyan-100 m-20 text-black rounded-3xl ">
        <div className="w-5/12 p-5">
          <div className="font-bold text-xl ">Vendas Dia a Dia:</div>
          <DoDiaVendedor salesData={vendasDoDia} />
        </div>

        <div className="h-96 border-2 border-sky-300 my-20 w-px"></div>

        <div className="w-5/12 p-5">
          <div className="font-bold text-xl ">Vendas Por Dia:</div>
          <PorDiaVendedor salesData={vendasPorDia} />
        </div>
      </section>

      <hr className="mx-20" />

      <section className="flex justify-start text-center bg-red-100 m-20 text-black rounded-3xl ">
        <div className="w-5/12 p-5">
          <VendasMap salesData={vendasDoDia} />
        </div>
      </section>

      <hr className="mx-20" />

      <section className="flex justify-between text-center bg-cyan-100 m-20 text-black rounded-3xl ">
        <div className="w-5/12 p-5">
          <div className="font-bold text-xl">Confirmadas X Canceladas:</div>
          <VendasStatusPieChart salesData={vendasDoDia} />
        </div>

        <div className="h-96 border-2 border-sky-300 my-20 w-px"></div>

        <div className="w-5/12 p-5">
          <div className="font-bold text-xl">Método de Pagamento:</div>
          <MtdPayVendedor salesData={vendasDoDia} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
