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
    const [vendas, setVendas] = useState([]);
    const [erro, setErro] = useState<string | null>(null);
    const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Vendas/User/Get/${user_id}`
        );
        setVendas(response.data);
      } catch (err) {
        setErro("erro ao capturar dados, Err: " + err);
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

  const handleCancelar = (id: string) => {
    // Implement cancellation logic here, e.g., axios.put(...)
  };

  const handleRestaurar = (id: string) => {
    // Implement restoration logic here, e.g., axios.put(...)
  };

  const handleEditar = (id: string) => {
    router.push("http://localhost:3000/")
  };

  //==================================================================================\\

  return (
    <div className="container flex justify-center">
      <div className="">
        {erro ? (
          <>
            <p>{erro}</p>
            <p>Você não tem Produtos Cadastrados</p>
          </>
        ) : (
          vendas.map((venda, index) => (
            <table className="bg-zinc-950 border-separate border-spacing-y-1 rounded-lg my-1 p-2 px-5 table-fixed w-full">
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
                    Data de Criação
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
                      <a className="hover:cursor-pointer" onClick={()=>handleCancelar(venda.id)}>
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
                      <a className="hover:cursor-pointer " onClick={()=>handleRestaurar(venda.id)}>
                        <FontAwesomeIcon
                          className="text-green-400 text-2xl rotate-on-hover hover:text-3xl"
                          icon={faRotateLeft}
                        />
                      </a>
                    ) : (
                      <FontAwesomeIcon
                        className="text-slate-500 text-2xl"
                        icon={faRotateLeft}
                      />
                    )}
                  </td>
                  <td className="border border-slate-700 text-center w-72 px-2">
                    <a className="hover:cursor-pointer" onClick={()=>handleEditar(venda.id)}>
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
    </div>
  );
};

export default VendasTable;
