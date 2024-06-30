"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface EditUsuarioProps {
  id: string;
}

const EditUsuario: React.FC<EditUsuarioProps> = ({ id }) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState({
    nome: "",
    email: "",
    tipo: "",
    cpf: "",
    tel: "",
    cep: "",
    endereco: "",
    senha: "",
    id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Users/GetUser/${id}`
        );
        setUser(response.data[0]);
      } catch (err) {
        setError("Erro ao pegar os dados: " + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Update user data via API
      const response = await axios.put(
        `http://localhost:5000/Users/Put/EditUser`,
        {
          nome: user.nome,
          email: user.email,
          senha: user.senha,
          tipo: user.tipo,
          tel: user.tel,
          endereco: user.endereco,
          cpf: user.cpf,
          cep: user.cep,
          id: user.id,
        }
      );

      if (response.data) {
        console.log("Cadastro bem-sucedido:", response.data);
        router.push("http://localhost:3000/Clients/Profile");
      }
    } catch (error) {
      console.error("Erro ao atualizar cadastro:", error);
      setError("Erro ao atualizar cadastro: " + error);
    }
  };

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center">
        <div className="bg-zinc-900 p-6  rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-center text-2xl font-semibold mb-6 ">
            Edit Usuario
          </h1>
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="Nome" className="block text-gray-100">
                Nome:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"></div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="email" className="block text-gray-100">
                Email:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"></div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="password" className="block text-gray-100">
                Senha:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"></div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="tel" className="block text-gray-100">
                Telefone:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600" />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="endereco" className="block text-gray-100">
                Endereço:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600" />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="cpf" className="block text-gray-100">
                CPF:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600" />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4">
              <label htmlFor="cep" className="block text-gray-100">
                CEP:
              </label>
              <div className="animate-pulse py-5 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"></div>
            </div>
            <div className="w-full px-3 mb-4">
              <label className="block text-gray-100 mb-2">Tipo:</label>

              <div className="flex items-center w-4/12 mt-2">
                <div className="animate-pulse py-3 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600" />
              </div>

              <div className="flex items-center w-4/12 mt-2">
                <div className="animate-pulse py-3 cursor-not-allowed form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600" />
              </div>

              <div className="flex justify-between mt-6">
                <button className="p-2 px-4 cursor-not-allowed rounded-xl animate-pulse bg-zinc-700">
                  Cancelar
                </button>
                <button className="p-2 px-4 cursor-not-allowed rounded-xl animate-pulse bg-zinc-700">
                  Cadastrar-se --&gt;
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6  rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-center text-2xl font-semibold mb-6 ">
          Edit Usuario
        </h1>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="Nome" className="block text-gray-100">
              Nome:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="text"
              id="Nome"
              value={user.nome}
              onChange={(e) => setUser({ ...user, nome: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="email" className="block text-gray-100">
              Email:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="password" className="block text-gray-100">
              Senha:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="password"
              id="password"
              value={user.senha}
              onChange={(e) => setUser({ ...user, senha: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="tel" className="block text-gray-100">
              Telefone:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="tel"
              id="tel"
              value={user.tel}
              onChange={(e) => setUser({ ...user, tel: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="endereco" className="block text-gray-100">
              Endereço:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="text"
              id="endereco"
              value={user.endereco}
              onChange={(e) => setUser({ ...user, endereco: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="cpf" className="block text-gray-100">
              CPF:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="text"
              id="cpf"
              value={user.cpf}
              onChange={(e) => setUser({ ...user, cpf: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-4">
            <label htmlFor="cep" className="block text-gray-100">
              CEP:
            </label>
            <input
              className="form-input w-full rounded-xl p-2 border border-gray-300 bg-zinc-600"
              type="text"
              id="cep"
              value={user.cep}
              onChange={(e) => setUser({ ...user, cep: e.target.value })}
              required
            />
          </div>
          <div className="w-full px-3 mb-4">
            <label className="block text-gray-100 mb-2">Tipo:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="Cliente"
                name="tipo"
                value="Cliente"
                checked={user.tipo === "Cliente"}
                onChange={(e) => setUser({ ...user, tipo: e.target.value })}
                className="form-radio"
              />
              <label htmlFor="Cliente" className="ml-2">
                Cliente
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="Ambos"
                name="tipo"
                value="Ambos"
                checked={user.tipo === "Ambos"}
                onChange={(e) => setUser({ ...user, tipo: e.target.value })}
                className="form-radio"
              />
              <label htmlFor="Ambos" className="ml-2">
                Ambos
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <a
            href="../"
            className="bg-gray-500 text-white rounded-full py-2 px-4 hover:bg-gray-600"
          >
            Cancelar
          </a>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 "
          >
            Atualizar -&gt;
          </button>
        </div>
        {error && (
          <div className="error text-red-600 font-semibold text-center mt-5">
            {error}
          </div>
        )}
      </form>
    </main>
  );
};
export default EditUsuario;
