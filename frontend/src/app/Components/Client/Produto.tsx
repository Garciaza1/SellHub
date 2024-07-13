"use client";
import axios from "axios";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface produtoProps {
  vendedor: any;
}

const Produto: React.FC<produtoProps> = ({ vendedor }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const params = useParams();
  const id = params.id;
  // console.log(id);

  useEffect(() => {
    const pegaProduto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Product/Get/${id}`
        );

        if (!response || !response.data) {
          setError("Não tem produtos nesta página!!");
          return;
        }
        const productData = response.data;
        setProducts(productData);
      } catch (err) {
        setError("Erro ao carregar os dados: " + err);
      }
    };

    pegaProduto();
  }, [id]);

  const handleQuantidadeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setQuantidade(Number(event.target.value));
  };
  // console.log(vendedor);

  return (
    <div className="container">
      <div className="text-center mb-5 text-4xl font-semibold">Produtos</div>
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
              className="bg-zinc-900 p-12 py-20 rounded-xl flex justify-evenly text-center"
            >
              <img
                className="my-3 rounded-lg size-min object-cover "
                style={{ width: "970px", height: "auto" }}
                src={product.imagem}
                alt={product.imagem_nome}
              />
              <div className="p-6 rounded-lg mx-2">
                <div className="text-center font-semibold text-2xl my-2">
                  {product.nome}
                </div>
                <hr />
                <div className="text-start font-semibold text-sm my-3">
                  Código: {product.codigo}
                </div>
                <div className="text-start font-bold text-green-500 text-2xl my-5">
                  <p>R$ {product.preco}</p>
                </div>
                <div className="text-start font-semibold text-lg my-4">
                  {product.descricao}
                </div>
                <div className="text-start font-semibold text-lg my-4">
                  Garantia
                  {product.garantia === 0
                    ? ": Nenhuma"
                    : ` de ${product.garantia} Meses`}
                </div>
                <div className="flex content-between my-3">
                  <div className="font-semibold text-lg me-1">
                    Categoria: {product.categoria}
                  </div>
                  <p>|</p>
                  <div className="font-semibold text-lg mx-1">
                    Marca: {product.marca}
                  </div>
                </div>
                <div className="text-start font-semibold text-lg my-4">
                  Quantidade em estoque: {product.quantidade}
                </div>
                <hr></hr>
                <div className="text-start text-sm my-7">
                  <p className="my-2">Vendedor:</p>
                  <p>
                    Nome:{" "}
                    <span className="text-stone-400 font-semibold">
                      {vendedor.nome}
                    </span>
                    <br />
                    Contato:{" "}
                    <span className="text-stone-400 font-semibold">
                      {vendedor.email}
                    </span>{" "}
                    | Tel:{" "}
                    <span className="text-stone-400 font-semibold">
                      {vendedor.tel}
                    </span>
                  </p>
                </div>
                <hr />
                {semEstoque ? (
                  <div className="text-center font-semibold text-lg my-1 text-red-600">
                    Sem Estoque
                  </div>
                ) : (
                  <div className="flex justify-center mt-5">
                    <div>Quantidade:</div>
                    <select
                      className="ms-2 px-3 rounded-lg bg-zinc-700"
                      value={quantidade}
                      onChange={handleQuantidadeChange}
                    >
                      {[...Array(product.quantidade).keys()].map((qtd) => (
                        <option key={qtd} value={qtd + 1}>
                          {qtd + 1}
                        </option>
                      ))}
                    </select>
                    <a
                      href={`http://localhost:3000/Clients/Product/Checkout/${product.id}/${quantidade}`}
                      className="ms-8 bg-red-500 p-1 rounded-lg"
                    >
                      COMPRAR
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
export default Produto;
