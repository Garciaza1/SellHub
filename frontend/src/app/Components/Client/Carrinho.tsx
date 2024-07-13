"use client";
import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CarrinhoProps {
  carrinho: any;
}

const Carrinho: React.FC<CarrinhoProps> = ({ carrinho }) => {
  const quantidadeProdutos = carrinho.length;
  const router = useRouter();
  const [error, setError] = useState<any | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const results = await axios.delete(
        `http://localhost:5000/Carrinho/Delete/${id}`
      );
      if (results.status === 200) {
        console.log(results);
      }
      router.refresh();
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  // console.log(carrinho);
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="content">
        <section className="flex justify-evenly">
          <table className="w-6/12 border-collapse bg-zinc-800 rounded-xl">
            <thead>
              <tr className="border-b-3 border-gray-300">
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  <p className="ps-16">Produto</p>
                </th>
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  Quantidade
                </th>
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  Total
                </th>
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  -
                </th>
              </tr>
            </thead>
            <tbody>
              {carrinho.map((cart: any, index: number) => (
                <tr key={index} className="border-t-2 border-gray-300">
                  <td className="px-5 py-4">
                    <div className="flex items-center">
                      <img
                        className="rounded-full w-12 h-12 object-cover"
                        src={cart.imagem}
                        alt={cart.nome}
                      />
                      <div className="ml-5">
                        <div className="text-xl mb-2.5 ">{cart.nome}</div>
                        <div className="text-stone-400">
                          Garantia de {cart.garantia} meses
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-start">
                    <span className="mx-2.5 ms-12">{cart.quantidade}</span>
                    {/* vai virar um input usar useState pra deixar igual a 1
                    fazer a mesma coisa do  product[id] onde passa as quantidades e etc*/}
                  </td>
                  <td className="px-5 py-4">
                    R$ {cart.preco * cart.quantidade}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(cart.id)}
                      className="px-1.5 h-6 rounded-full bg-red-600"
                    >
                      {/* tirar do carrinho chamar o excluir e regarregar a pag */}
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className="bg-zinc-800 h-64 w-3/12 rounded-lg">
            <div className="text-center py-1">
              <span className="font-semibold text-xl ">Produtos</span>
              <hr className="mt-2" />
              <div className="flex justify-center py-6">
                <p>
                  Quantidade:{" "}
                  <span className="font-semibold ">
                    {" "}
                    {carrinho.reduce((acc: number, item: { quantidade: number }) => acc + item.quantidade, 0)}
                  </span>
                </p>
              </div>
              <hr />
              <div className="flex justify-center py-6">
                <p>
                  Total em{" "}
                  <span className="font-semibold ">
                    R${" "}
                    {carrinho.reduce(
                      (acc: number, item: { quantidade: number, preco: number }) => acc + item.preco * item.quantidade,
                      0
                    )}
                  </span>
                </p>
              </div>
              {/* https://youtu.be/wARWyPzNA9o?si=JME8fFK3Qgl9jOvt&t=1775 */}
            </div>
            <hr />
            <div className="pt-3">
              <div className="flex justify-center ">
                <a href="http://localhost:3000/Clients/Carrinho/checkout">
                  <button className="rounded-xl border-2 px-2 py-1">
                    Comprar --&gt;
                  </button>
                </a>
              </div>
            </div>
            {error}
          </aside>
        </section>
      </div>
    </main>
  );
};
export default Carrinho;
