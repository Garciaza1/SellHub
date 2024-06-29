"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

dayjs.extend(RelativeTime);
dayjs.locale("pt-br");

const Profile = (session) => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any[]>([]);
  const [criadoEm, setCriadoEm] = useState<Date>(new Date());
  const [atualizadoEm, setAtualizadoEm] = useState<Date>(new Date());
  useEffect(() => {
    const pegaUsuario = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Users/GetUser/${session.session.id}`
        );
        setUser(response.data[0]);
        setCriadoEm(new Date(response.data[0].created_at));
        setAtualizadoEm(new Date(response.data[0].updated_at));
      } catch (err) {
        setError("Erro ao carregar os dados: " + err);
      }
    };
    pegaUsuario();
  }, [session.session.id]);

  //   const criadoEm = new Date(user.created_at);
  //   const atualizadoEm = new Date(user.updated_at);

  console.log(session);
  console.log(user);
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center font-bold mb-16">Perfil</h1>

      <section className="flex justify-center gap-0">
        <div className="w-4/12 bg-zinc-700 me-10 rounded-xl pb-5">
          <div className="mt-5 text-center text-2xl font-semibold">
            {session.session.nome}
          </div>
          <hr className="mt-5 mb-5"></hr>
          <div className="grid grid-cols-1 grid-rows-3 gap-y-3">
            <div className="text-center">
              <span className="font-semibold"> Tipo: </span>
              {session.session.tipo}
            </div>
            <div className="text-center">
              <span className="font-semibold"> Cpf: </span>
              {session.session.cpf}
            </div>
            <div className="text-center">
              <span className="font-semibold"> E-mail: </span>
              {session.session.email}
            </div>
            <div className="text-center">
              <span className="font-semibold"> Tel: </span>
              {session.session.tel}
            </div>
            {/* <div className="text-start ms-2">
              <a className="rounded-xl p-2 hover:bg-zinc-600" href="http://localhost:3000/Clients/Profile/Edit">
                <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                Editar Campos
              </a>
            </div> */}
          </div>
        </div>

        <div className="w-8/12 bg-zinc-700 ms-10 rounded-xl">
          <div className="table-auto w-full">
            <table className="table w-full">
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 text-left font-semibold">CEP</td>
                  <td className="px-6 py-4 text-left">{user.cep}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 text-left font-semibold">
                    Endereço
                  </td>
                  <td className="px-6 py-4 text-left">{user.endereco}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 text-left font-semibold">
                    Criado {dayjs().to(user.created_at)}
                  </td>
                  <td className="px-6 py-4 text-left">
                    <span className="font-semibold">Dia: </span>
                    {criadoEm.toLocaleDateString()}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 text-left font-semibold">
                    Atualizado {dayjs().to(user.updated_at)}
                  </td>
                  <td className="px-6 py-4 text-left">
                    <span className="font-semibold">Dia: </span>
                    {atualizadoEm.toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="bg-zinc-700 w-full h-14 mt-5 rounded-b-xl flex items-center justify-end">
        <div className="text-end me-2">
          <a className="rounded-xl p-2 hover:bg-zinc-600" href="http://localhost:3000/Clients/Profile/Edit">
            <FontAwesomeIcon icon={faUserEdit} className="me-2" />
            Editar Campos
          </a>
        </div>
      </section>
      {error}
    </div>
  );
};
export default Profile;
// mt-32 ms-20
