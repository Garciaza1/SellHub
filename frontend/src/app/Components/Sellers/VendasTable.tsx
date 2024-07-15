"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface MinhasVendasProps {
  user_id: string | undefined;
}

//==================================================================================\\

const VendasTable: React.FC<MinhasVendasProps> = ({ user_id }) => {
  const [vendas, setVendas] = useState<any[]>([]);
  const [erro, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Vendas/User/Get/${user_id}`
        );
        setVendas(response.data);
      } catch (err) {
        setError("erro ao capturar dados, Err: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user_id]);

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

  //==================================================================================\\

  const handleCancelar = async (
    id: string,
    product_id: string,
    quantidade: string
  ) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/Vendas/Put/Cancelar",
        { id, product_id, quantidade }
      );
      console.log("Resposta da API:", response.data);
      setError(null); // Limpar qualquer erro anterior
      location.reload();
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
      setError("Erro ao enviar os dados. Por favor, tente novamente.");
    }
  };

  console.log(vendas);
  const handleRestaurar = async (
    id: string,
    product_id: string,
    quantidade: string
  ) => {
    try {
      console.log(id, product_id, quantidade);
      const response = await axios.put(
        "http://localhost:5000/Vendas/Put/Restaurar",
        { id, product_id, quantidade }
      );
      console.log("Resposta da API:", response.data);
      setError(null); // Limpar qualquer erro anterior
      location.reload();
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
      setError("Erro ao enviar os dados. Por favor, tente novamente.");
    }
  };

  const handleEditar = (id: string) => {
    router.push(`http://localhost:3000/Sellers/Vendas/Edit/${id}`);
  };

  //==================================================================================\\

  if (loading) {
    // Exibição durante o carregamento
    return (
      <div className="container flex justify-center">
        <div className="">
          <div className="flex justify-center">
            <p className="text-4xl font-semibold mb-5">VENDAS</p>
          </div>
          <div>
            {Array.from({ length: 6 }).map((_, index) => (
              <table
                key={index}
                className="bg-zinc-950 border-separate border-spacing-y-2 rounded-lg my-2 p-2 px-5 table-fixed w-full animate-pulse"
              >
                <thead>
                  <tr>
                    <th className="border bg-gray-500 h-14 w-42 px-2 animate-pulse"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border bg-gray-500 h-14 my-1 w-42 px-2 animate-pulse"></td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    );
  }

  //==================================================================================\\

  return (
    <div className="container flex justify-center">
      <div className="">
        <div className="flex justify-center">
          <p className="text-4xl font-semibold mb-5">VENDAS</p>
        </div>
        {erro ? (
          <>
            <p>{erro}</p>
            <p>Você não tem Produtos Cadastrados</p>
          </>
        ) : (
          vendas.map((venda, index) => (
            <table key={index} className="bg-zinc-950 border-separate border-spacing-y-1 rounded-lg my-1 p-2 px-5 table-fixed w-full">
              <thead>
                <tr>
                  <th
                    className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 "
                    hidden
                  >
                    ID
                  </th>
                  <th className="text-center border border-slate-500 w-24 px-2 bg-zinc-800 ">
                    Cancelar
                  </th>
                  <th className="text-center border border-slate-500 w-24 px-2 bg-zinc-800 ">
                    Restaurar
                  </th>
                  <th className="text-center border border-slate-500 w-24 px-2 bg-zinc-800 ">
                    Editar
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Status da Venda
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Método de Pagamento
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Total
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Quantidade
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    CPF
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Endereço
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Número da Residência
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    CEP
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Data da Venda
                  </th>
                  <th className="text-center border border-slate-500 w-32 px-2 bg-zinc-800 ">
                    Data de Atualização
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr key={index}>
                  <td
                    className="border border-slate-700 text-start w-72 px-2"
                    hidden
                  >
                    {venda.id}
                  </td>
                  {/* LOGICA BTN CANCELAR */}
                  <td className="border border-slate-700 text-center w-72 px-2">
                    {venda.sts_venda === "Cancelada" ? (
                      <FontAwesomeIcon
                        className="text-slate-500 text-2xl"
                        icon={faTrashCan}
                      />
                    ) : (
                      <a
                        className="hover:cursor-pointer"
                        onClick={() =>
                          handleCancelar(
                            venda.id,
                            venda.product_id,
                            venda.quantidade
                          )
                        }
                      >
                        <FontAwesomeIcon
                          className="text-red-600 text-2xl transition ease-in-out delay-75 hover:scale-125 duration-300"
                          icon={faTrashCan}
                        />
                      </a>
                    )}
                  </td>
                  {/* LOGICA BTN RESTAURAR */}
                  <td className="border border-slate-700 text-center w-72 px-2">
                    {venda.sts_venda === "Cancelada" ? (
                      <a
                        className="hover:cursor-pointer "
                        onClick={() =>
                          handleRestaurar(
                            venda.id,
                            venda.product_id,
                            venda.quantidade
                          )
                        }
                      >
                        <FontAwesomeIcon
                          className="text-green-400 text-2xl rotate-on-hover hover:text-3xl"
                          icon={faRotateLeft}
                        />
                      </a>
                    ) : (
                      <p>
                        <FontAwesomeIcon
                          className="text-slate-500 text-2xl"
                          icon={faRotateLeft}
                        />
                      </p>
                    )}
                  </td>
                  <td className="border border-slate-700 text-center w-72 px-2">
                    <a
                      className="hover:cursor-pointer"
                      onClick={() => handleEditar(venda.id)}
                    >
                      <FontAwesomeIcon
                        className="text-zinc-200 text-2xl hover:animate-pulse transition ease-in-out delay-75 hover:scale-125 duration-300"
                        icon={faPenToSquare}
                      />
                    </a>
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.sts_venda}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.mtd_pay}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    R$ {venda.total}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.quantidade}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.cpf}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.endereco}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.num_residencia}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {venda.cep}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {formatDate(venda.created_at)}
                  </td>
                  <td className="border border-slate-700 text-center px-2">
                    {formatDate(venda.updated_at)}
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        )}
      </div>
      {erro}
    </div>
  );
};

export default VendasTable;
