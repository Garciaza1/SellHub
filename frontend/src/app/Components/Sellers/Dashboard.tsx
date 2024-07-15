"use client";
import React, { useState, useEffect } from "react";
import {
  getDataVendedorPorDia,
  getDataVendedorDoDia,
  getMtdPay,
  getSomas,
} from "../../lib/helpers/GetDashboard";
import DoDiaVendedor from "../Dashboard/VendedorDoDia";
import PorDiaVendedor from "../Dashboard/VendedorPorDia";
import MtdPayVendedor from "../Dashboard/mtdPayVendedor";
import VendasStatusPieChart from "../Dashboard/PieConfirmed";
import VendasMap from "../Dashboard/VendaMap";
// import QntdXvalor from "../Dashboard/VendedorQntXValor";

interface DashboardProps {
  user_id: string | undefined;
}

interface Soma {
  quantidade: string;
  total: string;
  vendas: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user_id }) => {
  const [vendasDoDia, setVendasDoDia] = useState<any[] | null>(null);
  const [vendasPorDia, setVendasPorDia] = useState<any[] | null>(null);
  const [MtdPay, setMtdPay] = useState<any[] | null>(null);
  const [somas, setSomas] = useState<Soma | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const FetchVendasDoDia = async () => {
      try {
        const response = await getDataVendedorPorDia(user_id);
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

    const FecthMtdPay = async () => {
      try {
        const mtdPay = await getMtdPay(user_id);
        const response = mtdPay;
        setMtdPay(response);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      }
    };

    const FetchGetSomas = async () => {
      try {
        const response = await getSomas(user_id);
        if (response) {
          setSomas(response[0]);
        } else {
          setSomas(null);
        }
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      }
    };

    FetchGetSomas();
    FetchVendasDoDia();
    FetchVendasPorDia();
    FecthMtdPay();
  }, [user_id]);

  
  return (
    <div className="container bg-gray-500 rounded-xl">
      {error}
      <div className="flex justify-center text-center">
        <p className="text-5xl font-bold text-stone-200 mt-10 underline decoration-red-400">
          DASHBOARD
        </p>
      </div>

      <section className="flex justify-between items-center text-center bg-cyan-100 m-20 text-black rounded-3xl py-5">
        <div className="px-8 font-semibold py-5 border rounded-xl ms-6 bg-teal-500">
          Produtos Vendidos: <br />
          <span className="font-bold text-lg"> {somas?.quantidade}</span>
        </div>
        <div className="px-10 font-semibold py-5 border rounded-xl bg-teal-500">
          Total em Vendas: <br />
          <span className="font-bold text-lg"> R${somas?.total}</span>
        </div>
        <div className="px-10 font-semibold py-5 border rounded-xl me-6 bg-teal-500">
          N° de Vendas: <br />
          <span className="font-bold text-lg"> {somas?.vendas}</span>
        </div>
      </section>

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

      <section className="text-start bg-red-100 m-20 text-black rounded-3xl ">
        <div className="flex justify-start ">
          <div className="w-5/12 p-5">
            <VendasMap salesData={vendasDoDia} />
          </div>
        </div>
        <div className="flex justify-start ms-2 pb-2 items-center">
          <p className="text-red-600 text-sm ps-5">
            Nem todas as vendas tem cep valido | Algumas podem não aparecer
          </p>
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
          <MtdPayVendedor salesData={MtdPay} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
