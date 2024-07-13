"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
// import GetUser from "@/app/lib/helpers/UserData";
import fetchUserSession from "@/app/lib/helpers/SessionData";

interface checkoutProps {
  product: any;
  vendedor: any;
  user_id: any;
}

const CompraForm: React.FC<checkoutProps> = ({ product, vendedor, user_id }) => {
  const [id_user, setIdUser] = useState<any>("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numResidencia, setNumResidencia] = useState("");
  const [cep, setCep] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const quantidade = Number(params.quantidade);
  const valor = product.preco * quantidade;

  const fetchUser = async () => {
    try {
      const user = await fetchUserSession();
      const id = user?.id;
      setIdUser(id);
      console.log(user)
    } catch (error) {
      console.error("Erro ao buscar sessão do usuário:", error);
    }
  };

  // useEffect(() => {
  // }, []);

  //ID DO VENDEDOR PRA PUXAR OS DADOS DELE

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetchUser();
      const data = {
        endereco,
        numResidencia,
        cep,
        valor,
        quantidade,
        metodoPagamento,
        cpf,
        user_id: user_id,
        id_produto: product.id,
        vendedor_id: vendedor.id,
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/Vendas/Post/Compra",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta da API:", response.data);

      setError(null); // Limpar qualquer erro anterior
      alert("Compra confirmada com sucesso!");
      router.push("http://localhost:3000/Clients/Compras");
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
      setError("Erro ao enviar os dados. Por favor, tente novamente.");
    }
  };

  return (
    <div className="container mx-auto flex justify-center col-6">
      <div className="row justify-center items-center my-4">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="form border rounded-3 flex justify-center text-center p-6"
        >
          <div className="container mx-auto col-6 my-3">
            <div className="mb-3">
              <label
                className="form-label block text-left"
                htmlFor="text_endereco"
              >
                Endereço de Entrega:*
              </label>
              <input
                type="text"
                name="text_endereco"
                onChange={(e) => setEndereco(e.target.value)}
                className="form-control block w-full mt-1 p-2 border rounded-xl  bg-zinc-700"
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label block text-left"
                htmlFor="text_num_residencia"
              >
                Número:*
              </label>
              <input
                type="number"
                name="text_num_residencia"
                onChange={(e) => setNumResidencia(e.target.value)}
                className="form-control block w-full mt-1 p-2 border rounded-xl  bg-zinc-700"
              />
            </div>
            <div className="mb-3">
              <label className="form-label block text-left" htmlFor="text_CEP">
                CEP:*
              </label>
              <input
                type="text"
                name="text_CEP"
                onChange={(e) => setCep(e.target.value)}
                className="form-control block w-full mt-1 p-2 border rounded-xl  bg-zinc-700"
              />
            </div>
            <div className="mb-3">
              <label className="form-label block text-left" htmlFor="text_CPF">
                CPF DO PAGANTE:*
              </label>
              <input
                type="text"
                name="text_CPF"
                onChange={(e) => setCpf(e.target.value)}
                className="form-control block w-full mt-1 p-2 border rounded-xl  bg-zinc-700"
              />
            </div>
          </div>
          <div className="container mx-auto col-6 my-3">
            <div className="mb-3">
              <label className="form-label block text-left ms-3">
                Método de Pagamento:*
              </label>
              <div className="flex justify-around mt-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input bg-zinc-700"
                    type="radio"
                    name="text_mtd_pay"
                    value="Debito"
                    id="Debito"
                    checked={metodoPagamento === "Debito"}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                  />
                  <label className="form-check-label ml-2" htmlFor="Debito">
                    Débito
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="text_mtd_pay"
                    value="Credito"
                    id="Credito"
                    checked={metodoPagamento === "Credito"}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                  />
                  <label className="form-check-label ml-2" htmlFor="Credito">
                    Crédito
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input bg-zinc-700"
                    type="radio"
                    name="text_mtd_pay"
                    value="Boleto"
                    id="Boleto"
                    checked={metodoPagamento === "Boleto"}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                  />
                  <label className="form-check-label ml-2" htmlFor="Boleto">
                    Boleto
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input bg-zinc-700"
                    type="radio"
                    name="text_mtd_pay"
                    value="Pix"
                    id="Pix"
                    checked={metodoPagamento === "Pix"}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                  />
                  <label className="form-check-label ml-2" htmlFor="Pix">
                    Pix
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                className="btn border m-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Confirmar Compra!
              </button>
              <label
                className="form-check-label ml-2 text-red-600 text-lg font-semibold"
                htmlFor="Pix"
              >
                R$ {valor}
                <br></br>
                Quantidade: {quantidade}
              </label>
            </div>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};
export default CompraForm;
