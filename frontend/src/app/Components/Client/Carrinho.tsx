'use client'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CarrinhoProps {
  carrinho: any;
}

const Carrinho: React.FC<CarrinhoProps> = ({ carrinho }) => {
  
const quantidadeProdutos = carrinho.length;

  console.log(carrinho);
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
                    <span className="mx-2.5 ms-12">{cart.quantidade}</span>{/* vai virar um input usar useState pra deixar igual a 1 
                    fazer a mesma coisa do  product[id] onde passa as quantidades e etc*/}
                  </td>
                  <td className="px-5 py-4">R$ {cart.total}</td>
                  <td className="px-5 py-4"><button  className="px-1.5 h-6 rounded-full bg-red-600"><FontAwesomeIcon icon={faXmark}/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <aside className="bg-zinc-800">
              <div>
                <p>{carrinho.reduce((acc, item) => acc + item.quantidade, 0)}</p>
                <p>R$ {carrinho.reduce((acc, item) => acc + item.total * item.quantidade, 0)}</p> vai melhorar depois de vc fazer o backend!!
                {/* https://youtu.be/wARWyPzNA9o?si=JME8fFK3Qgl9jOvt&t=1775 */}
              </div>
              <div className="">
                <div className="flex justify-evenly">
                  <button>Comprar</button>
                  <button></button>
                </div>
              </div>
          </aside>
        </section>
      </div>
    </main>
  );
};
export default Carrinho;
