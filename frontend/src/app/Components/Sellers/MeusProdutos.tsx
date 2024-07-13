"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface MeusProdutosProps {
  user_id: string | undefined;
}
const MeusProdutos: React.FC<MeusProdutosProps> = ({ user_id }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/User/Products/Get/${user_id}`
        );
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center mb-5 text-4xl font-semibold">
          Meus produtos
        </div>
        <div className="bg-zinc-900 p-8 rounded-lg flex justify-center text-center">
          {[...Array(4).keys()].map((index) => (
            <div
              key={index}
              className="bg-zinc-950 p-6 rounded-lg mx-4 grid content-evenly"
              style={{ width: "23.5rem", height: "32rem" }}
            >
              <div className="text-center font-semibold text-2xl animate-pulse bg-zinc-700 my-1 h-10  rounded-xl"></div>
              <div className="flex justify-center bg-zinc-700 animate-pulse rounded-xl">
                <img
                  className="my-3 bg-zinc-700 animate-pulse"
                  style={{ height: "10rem" }}
                  alt=""
                  src={"##"}
                />
              </div>
              <div className="text-center font-semibold text-lg my-1 bg-zinc-700 animate-pulse h-10  rounded-xl"></div>
              <div className="text-center font-semibold text-lg my-1 bg-zinc-700 animate-pulse h-10  rounded-xl"></div>
              <div className="text-center font-semibold text-lg my-1 bg-zinc-700 animate-pulse h-10  rounded-xl"></div>
              <div className="text-center font-semibold text-lg my-1 bg-zinc-700 animate-pulse h-10  rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-grid-slate-100 ">
      <div className="text-center mb-5 text-4xl font-semibold">
        Meus produtos
      </div>
      <div className="bg-zinc-900 p-8 rounded-lg grid gap-4 grid-cols-4 grid-rows-2 justify-center text-center">
        {error ? (
          <>
            <p>{error}</p>
            <p>Você não tem Produtos Cadastrados</p>
          </>
        ) : (
          // para cada produto uma div dessa
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

export default MeusProdutos;
