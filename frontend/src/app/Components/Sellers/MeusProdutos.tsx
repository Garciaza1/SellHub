"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface MeusProdutosProps {
  user_id: string | undefined;
}
const MeusProdutos: React.FC<MeusProdutosProps> = ({ user_id }) => {
  const [products, setProducts] = useState([]);
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
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <div className="">
      <div className="text-center mb-5 text-4xl font-semibold">
        Meus produtos
      </div>
      <div className="bg-zinc-900 p-8 rounded-lg flex justify-center text-center">
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
                <img
                  className="my-3 rounded-lg"
                  src={product.imagem}
                  alt={product.nome}
                  width={180}
                />
              </div>
              <div className="text-center font-semibold text-lg my-1">
                {product.descricao}
              </div>
              <div className="text-center font-semibold text-lg my-1">
                R$ {product.preco}
              </div>
              <div className="text-center font-semibold text-lg my-1">
                Garantia: {product.garantia === 0 ? "Nenhuma" : product.garantia}
              </div>
              <div className="flex content-envenly p-1 ">
                <div className="font-semibold text-lg mx-1">
                  Categoria: {product.categoria}
                </div>
                <p>|</p>
                <div className="font-semibold text-lg mx-1">
                  Marca: {product.marca}
                </div>
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
