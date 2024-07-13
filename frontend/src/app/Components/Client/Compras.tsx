import Image from "next/image";

interface ComprasProps {
  compras: any;
}

const Compras: React.FC<ComprasProps> = ({ compras }) => {
  // console.log(compras);
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="content">
        <section className="flex justify-center">
          <table className="w-6/12 border-collapse bg-zinc-800 rounded-xl">
            <thead>
              <tr>
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  <p className="ps-16">Produto</p>
                </th>
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  Quantidade
                </th>
                <th className="text-left px-5 py-4 uppercase text-gray-100">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {compras.map((cart: any, index: number) => (
                <tr key={index} className="border-t-2 rounded-xl border-gray-300">
                  <td className="px-5 py-4">
                    <div className="flex items-center">
                      <img
                        className="rounded-full w-20 h-20 object-cover"
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
                  </td>
                  <td className="px-5 py-4">R$ {cart.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
};
export default Compras;
