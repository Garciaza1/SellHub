"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const TodosProdutos = (user: null | any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

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
      } finally {
        setLoading(false);
      }
    };
    pegaProdutos();
  }, []);

  const handleCarrinho = async (product_id: string) => {
    if (!user) {
      setError("Impossível adicionar ao carrinho, faça login!");
      return;
    }
    try {
      console.log(user.user.id, product_id)
      const response = await axios.post("http://localhost:5000/Carrinho/Post", {
        user_id: user.user.id,
        product_id,
        quantidade: 1,
      });
      if (response.status === 200) {
        setError("Produto adicionado ao carrinho com sucesso!");
        // abrir modal posteriormente
      }
    } catch (err: any) {
      setError("Erro ao adicionar produto ao carrinho: " + err.message);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

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
    <div className="container">
      <div className="text-center mb-5 text-4xl font-semibold">Produtos</div>
      {/* colocar botoes de paginação */}
      <div className="bg-zinc-900 pb-20 pt-10 rounded-xl flex justify-center text-center h-min">
        <div className="m-0 p-0">
          <div className="flex justify-end mb-5">
            <button
              onClick={handlePrevPage}
              className="bg-zinc-800 text-white px-4 py-2 mx-2 rounded-lg hover:cursor-pointer hover:bg-zinc-900 hover:animate-pulse"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <button
              onClick={handleNextPage}
              className="bg-zinc-800 text-white px-4 py-2 mx-2 rounded-lg hover:cursor-pointer hover:bg-zinc-900 hover:animate-pulse"
              disabled={indexOfLastProduct >= products.length}
            >
              &gt;
            </button>
          </div>

          <div className="grid gap-10 grid-cols-4 grid-rows-2 justify-center">
            {error ? (
              <>
                <p>{error}</p>
                <p>não tem produtos nesta pagina!</p>
              </>
            ) : (
              currentProducts.map((product, index) => {
                const semEstoque = product.quantidade <= 0;
                return (
                  <div
                    key={index}
                    className="bg-zinc-950 p-4 rounded-lg mb-4 w-72"
                  >
                    <div className="flex justify-center">
                      <a
                        href={`http://localhost:3000/Clients/Product/${product.id}`}
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 hover:mt-3 duration-300"
                      >
                        <img
                          className="my-3 rounded-xl object-cover size-96"
                          src={product.imagem}
                          alt={product.nome}
                          width={180}
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
                      <div>
                        <div className="text-center font-semibold text-lg my-1 text-green-600">
                          Em Estoque
                        </div>
                        <div className="mt-4">
                          <button
                            onClick={() => handleCarrinho(product.id)}
                            className="p-2 px-4 bg-blue-500 rounded-xl"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faCartPlus} className="text-2xl"/>
                          </button>
                          {error}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 h-10">
        <button
          onClick={handlePrevPage}
          className="bg-zinc-800 text-white px-4 py-2 mx-2 rounded-lg hover:cursor-pointer hover:bg-zinc-900 hover:animate-pulse"
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          className="bg-zinc-800 text-white px-4 py-2 mx-2 rounded-lg hover:cursor-pointer hover:bg-zinc-900 hover:animate-pulse"
          disabled={indexOfLastProduct >= products.length}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};
export default TodosProdutos;
