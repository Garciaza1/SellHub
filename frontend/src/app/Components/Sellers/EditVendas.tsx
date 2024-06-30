"use client";
import React, {
  useState,
  FormEvent,
  ChangeEvent,
  useRef,
  useEffect,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

interface VendaEditProps {
  id: string | undefined;
}

const VendasEdit: React.FC<VendaEditProps> = ({ id }) => {
  const router = useRouter();
  const [vendas, setVendas] = useState<any>({
    sts_venda: "",
    mtd_pay: "",
    total: "",
    cpf: "",
    endereco: "",
    num_residencia: "",
    cep: "",
    product_id: "",
    user_id: "",
    vendedor_id: "",
  });
  
  const [quantidadeNova, setQuantidadeNova] = useState<any>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Vendas/Get/${id}`
        );
        const data = response.data[0];
        setVendas(data);
        setQuantidadeNova(data.quantidade);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      }
    };

    fetchData();
  }, [id]);

  let diferençaQuantidade = null;
  if (vendas.quantidade) {
    if (quantidadeNova - vendas.quantidade === 0) {
      diferençaQuantidade = 0;
    } else {
      diferençaQuantidade = quantidadeNova - vendas.quantidade;
    }
  }

  const handleVendaForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", vendas.id);
    formData.append("endereco", vendas.endereco);
    formData.append("numResidencia", vendas.num_residencia);
    formData.append("cep", vendas.cep);
    formData.append("valor", vendas.total);
    formData.append("quantidade", quantidadeNova);
    formData.append("metodoPagamento", vendas.mtd_pay);
    formData.append("cpf", vendas.cpf);
    formData.append("user_id", vendas.user_id);
    formData.append("id_produto", vendas.product_id);
    formData.append("vendedor_id", vendas.vendedor_id);

    try {
      const response = await axios.put(
        `http://localhost:5000/Vendas/Put/Edit`,
        {
          endereco: vendas.endereco,
          numResidencia: vendas.num_residencia,
          cep: vendas.cep,
          valor: vendas.total,
          quantidade: quantidadeNova,
          metodoPagamento: vendas.mtd_pay,
          cpf: vendas.cpf,
          user_id: vendas.user_id,
          id_produto: vendas.product_id,
          vendedor_id: vendas.vendedor_id,
          diferençaQuantidade,
          id: vendas.id,
        }
      );
      if (response.data) {
        console.log(response.data);
        router.push("http://localhost:3000/Sellers/Vendas");
      }
    } catch (err) {
      console.error("Erro no PUT: " + err);
      setError("Erro na solicitação, erro: " + err);
    }
  };

  return (
    <div className="w-8/12 ">
      <div className="bg-zinc-950 p-8 rounded-xl w-full">
        <form onSubmit={handleVendaForm}>
          <div className="flex justify-evenly">
            {/* metade da esquerda */}
            <div className="flex w-full justify-start p-0 m-0">
              <div className="w-full">
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    <span className="block text-lg">Status da Venda:</span>
                    <input
                      type="text"
                      readOnly={true}
                      value={vendas.sts_venda}
                      onChange={(e) => setVendas({ ...vendas, sts_venda: e.target.value })}
                      className="py-1 rounded-xl w-full mx-0 mt-2 bg-zinc-700 text-center"
                      required
                    />
                  </label>
                </div>
                <div className="my-2">
                  <label className="block mb-2 font-medium">
                    <span className="block text-lg">Método de pagamento:</span>
                    <input
                      value={vendas.mtd_pay}
                      onChange={(e) => setVendas({ ...vendas, mtd_pay: e.target.value })}
                      className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                      required
                    />
                  </label>
                </div>
                <div className="my-2">
                  <label className="block mb-2 font-medium">
                    <span className="block text-lg">Endereço:</span>
                    <input
                      value={vendas.endereco}
                      onChange={(e) => setVendas({ ...vendas, endereco: e.target.value })}
                      className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
            {/* metade da direita */}
            <div className="w-full">
              <div className="w-full mx-1 flex ">
                <div className="w-6/12 mx-2">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Quantidade:</span>
                      <input
                        type="number"
                        step={"1"}
                        value={vendas.quantidade}
                        onChange={(e) => setQuantidadeNova(e.target.value)}
                        className="py-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="w-6/12">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Total em R$:</span>
                      <input
                        type="number"
                        step={"0.01"}
                        value={vendas.total}
                        onChange={(e) => setVendas({ ...vendas, total: e.target.value })}
                        className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full ms-4">
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    <span className="block text-lg">Endereço:</span>
                    <input
                      type="text"
                      value={vendas.cpf}
                      onChange={(e) => setVendas({ ...vendas, cpf: e.target.value })}
                      className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                      required
                    />
                  </label>
                </div>
              </div>
              <div className="flex">
                <div className="w-6/12 ms-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Número Residência:</span>
                      <input
                        type="number"
                        value={vendas.num_residencia}
                        onChange={(e) => setVendas({ ...vendas, num_residencia: e.target.value })}
                        className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                        required
                      />
                    </label>
                  </div>
                </div>
                <div className="w-6/12 ms-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">CEP:</span>
                      <input
                        type="text"
                        value={vendas.cep}
                        onChange={(e) => setVendas({ ...vendas, cep: e.target.value })}
                        className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botao */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-5 text-white bg-zinc-900 hover:bg-zinc-700 rounded-lg px-3 py-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      {error}
    </div>
  );
};

export default VendasEdit;
