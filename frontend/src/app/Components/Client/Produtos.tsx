"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TodosProdutos = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pegaProdutos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Products/GetAll"
        );

        if (!response) {
          setError("Não tem produtos nesta página!!");
        }
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      }
    };

    pegaProdutos();
  }, []);
  console.log(products);
  return (
    <div className="container">
      <div className="text-center mb-5 text-4xl font-semibold">Produtos</div>
      <div className="bg-zinc-900 p-12 py-20 rounded-xl flex flex-wrap justify-center text-center">
        {error ? (
          <>
            <p>{error}</p>
            <p>não tem produtos nesta pagina!</p>
          </>
        ) : (
          products.map((product, index) => {
            const semEstoque = product.quantidade <= 0;
            return (
              <div
                key={index}
                className="bg-zinc-950 px-6 rounded-lg mx-2 mb-4 "
              >
                <div className="w-56 flex items-center justify-center">
                  <a
                    href={`http://localhost:3000/Clients/Product/${product.id}`}
                    className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 hover:mt-3 duration-300"
                  >
                    <img
                      className="my-3 rounded-lg object-cover size-80"
                      src={product.imagem}
                      alt={product.nome}
                    />
                  </a>
                </div>
                <div className="text-center font-semibold text-2xl mt-2">
                  {product.nome}
                </div>
                <div className="text-center font-semibold text-lg my-1">
                  R$ {product.preco}
                </div>
                {semEstoque ? (
                  <div className="text-center font-semibold text-lg my-1 text-red-600">
                    Sem Estoque
                  </div>
                ) : (
                  <div className="text-center font-semibold text-lg my-1 text-green-600">
                    Em Estoque
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default TodosProdutos;
