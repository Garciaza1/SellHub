"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface categoriaProps {
  categoria: string;
}

const Categoria: React.FC<categoriaProps> = ({ categoria }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isZero, setIszero] = useState(true);

  useEffect(() => {
    const pegaProdutos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Categoria/Get/${categoria}`
        );

        if (response.status === 200 && response.data && response.data.results) {
          console.log(response.data.results)
          setProducts(response.data.results);
          setIszero(response.data.results.length === 0);
        } else {
          setIszero(true);
        }
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      } finally {
        setLoading(false);
      }
    };

    pegaProdutos();
  }, [categoria]);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center mb-5 text-4xl font-semibold">Produtos</div>
        <div
          className="bg-zinc-900 p-12 py-20 rounded-xl flex flex-wrap justify-center text-center "
          style={{ height: "65vh", width: "auto" }}
        >
          {[...Array(4).keys()].map((index) => (
            <div
              key={index}
              className="bg-zinc-950 px-6 w-72 rounded-lg mx-4 mb-4 animate-pulse flex justify-center pb-24"
              style={{ height: "32rem" }}
            >
              <div className="grid h-full w-full">
                <div className="flex justify-center bg-zinc-700 animate-pulse my-5 rounded-xl">
                  <img
                    className="my-3  bg-zinc-700 animate-pulse "
                    style={{ height: "20rem" }}
                  />
                </div>
                <div className="bg-zinc-800 h-1 w-full rounded-lg p-5 mb-1 animate-pulse"></div>
                <div className="bg-zinc-800 h-1 w-full rounded-lg p-5 mb-1 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-grid-slate-100">
      <div className="text-center mb-5 text-4xl font-semibold">
        Meus produtos
      </div>
      <div className="bg-zinc-900 p-8 rounded-lg grid gap-4 grid-cols-4 grid-rows-2 justify-center text-center">
        {error ? (
          <>
            <p>{error}</p>
            <p>Você não tem Produtos Cadastrados</p>
          </>
        ) : isZero ? (
          <div>
            <p>Não tem produtos na categoria {categoria}!</p>
          </div>
        ) : (
          products.map((product, index) => (
            <div key={index} className="bg-zinc-950 p-6 rounded-lg mx-2">
              <div className="text-center font-semibold text-2xl">
                {product.nome}
              </div>
              <div className="flex justify-center">
                <a
                  href={`http://localhost:3000/Sellers/MeusProdutos/Edit/${product.id}`}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 hover:mt-3 duration-300"
                >
                  <img
                    className="my-3 rounded-xl object-cover size-80"
                    src={`${product.imagem}`}
                    alt={product.nome}
                    width={180}
                  />
                </a>
              </div>
              <div className="text-center font-semibold text-lg my-1">
                {product.descricao}
              </div>
              <div className="text-center font-semibold text-lg my-1">
                R$ {product.preco}
              </div>
              <div className="text-center font-semibold text-lg my-1">
                Garantia:{" "}
                {product.garantia === 0
                  ? "Nenhuma"
                  : product.garantia + " Meses"}
              </div>
              <div className="font-semibold text-lg my-1">
                Categoria: {product.categoria}
              </div>
              <div className="font-semibold text-lg my-1">
                Marca: {product.marca}
              </div>
              <div className="text-center font-semibold text-lg my-1">
                Código: {product.codigo}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Categoria;
