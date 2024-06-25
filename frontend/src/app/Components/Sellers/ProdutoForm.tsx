"use client";
import React, { useState, FormEvent, ChangeEvent, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProdutoFormProps {
  user_id: string | undefined;
}

function radomCode(length: number) {
  let result = "";
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function ramdomnumber(length: number) {
  let result = "";
  const characters = "123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const codigoDeBarras = ramdomnumber(1) + radomCode(11);

const ProdutoForm: React.FC<ProdutoFormProps> = ({ user_id }) => {
  const router = useRouter();
  const [imagemProduto, setImagemProduto] = useState<File | null>(null);

  const [erro, setError] = useState<String | unknown>(null);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuant] = useState("");
  const [descricao, setDesc] = useState("");
  const [codigo, setCodigo] = useState(codigoDeBarras);
  const [garantia, setGarantia] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  // Adicione aqui os outros estados para os campos do formulário

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === "string") {
          setImagemProduto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode construir o objeto com os dados do formulário
    const data = {
      nome,
      descricao,
      imagem: imagemProduto,
      preco,
      quantidade,
      codigo,
      garantia,
      categoria,
      marca,
      user_id,
    };

    console.log(data);
    // Aqui você pode enviar os dados para a API usando axios
    try {
      const response = await axios.post(
        "http://localhost:5000/Products/Post/Create",
        data
      );
      if (response.data) {
        console.log(response.data);
        router.push("http://localhost:3000/Sellers/MeusProdutos");
      }
    } catch (error) {
      setError(error.response?.data.error || error.message);
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const clearFileInput = () => {
    setImagemProduto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-8/12 ">
      <div className="bg-zinc-950 p-8 rounded-xl w-full">
        <form onSubmit={handleProductForm}>
          <div className="flex justify-evenly">
            {/* metade da esquerda */}
            <div className="w-6/12 mx-1">
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  <span className="block text-lg">Nome do produto:</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="py-1 rounded-xl w-full mt-2  bg-zinc-700 text-center"
                    required
                  />
                </label>
              </div>

              <div className="my-2">
                <label className="block mb-2 font-medium">
                  <span className="block text-lg">Descrição Do Produto:</span>
                  <textarea
                    value={descricao}
                    onChange={(e) => setDesc(e.target.value)}
                    className="py-3 ps-3 rounded-xl w-full mt-2 bg-zinc-700 "
                    required
                  ></textarea>
                </label>
              </div>

              <div className="my-3 flex flex-col ">
                <span className="block text-lg">Imagem do Produto:</span>
                <label className="block mb-2 font-medium cursor-pointer flex justify-center mt-2 bg-zinc-900 hover:bg-zinc-700 py-1 rounded-lg w-8/12 ms-20">
                  Selecione
                  <input
                    type="file"
                    name="imagemProduto"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                </label>
                {imagemProduto ? (
                  <label className={`w-10/12 border rounded-xl p-2 ms-10 `}>
                    <button
                      type="button"
                      onClick={clearFileInput}
                      className="ml-4 px-2 py-1 "
                    >
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="bg-red-600 rounded-full p-1"
                      />
                    </button>
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* metade da direita */}
            <div className="">
              <div className="w-full mx-1 flex ">
                <div className="w-6/12 mx-2">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Quantidade:</span>
                      <input
                        type="number"
                        step={"1"}
                        value={quantidade}
                        onChange={(e) => setQuant(e.target.value)}
                        className="py-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="w-6/12">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Valor em R$:</span>
                      <input
                        type="number"
                        step={"0.01"}
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
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
                    <span className="block text-lg">Codigo de Barras:</span>
                    <input
                      type="text"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="w-full ms-4">
                <div className="mb-4">
                  <label className="block mb-2 font-medium">
                    <span className="block text-lg">Categoria:</span>
                  </label>

                  <div className="flex ps-5">
                    <div className="">
                      <div className="flex items-center">
                        <label htmlFor="Casa" className="ml-2 me-2">
                          Casa
                        </label>
                        <input
                          type="radio"
                          id="Casa"
                          name="tipo"
                          value="Casa"
                          checked={categoria === "Casa"}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="form-radio"
                        />
                      </div>

                      <div className="flex items-center">
                        <label htmlFor="Casa" className="ml-2 me-2">
                          Roupa
                        </label>
                        <input
                          type="radio"
                          id="Roupa"
                          name="tipo"
                          value="Roupa"
                          checked={categoria === "Roupa"}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="form-radio"
                        />
                      </div>

                      <div className="flex items-center">
                        <label htmlFor="Casa" className="ml-2 me-2">
                          Esporte
                        </label>
                        <input
                          type="radio"
                          id="Esporte"
                          name="tipo"
                          value="Esporte"
                          checked={categoria === "Esporte"}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="form-radio"
                        />
                      </div>
                    </div>

                    <div className="ms-5">
                      <div className="flex items-center">
                        <label htmlFor="Casa" className="ml-2 me-2">
                          Games
                        </label>
                        <input
                          type="radio"
                          id="Games"
                          name="tipo"
                          value="Games"
                          checked={categoria === "Games"}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="form-radio"
                        />
                      </div>

                      <div className="flex items-center">
                        <label htmlFor="Casa" className="ml-2 me-2">
                          Maquiagem
                        </label>
                        <input
                          type="radio"
                          id="Maquiagem"
                          name="tipo"
                          value="Maquiagem"
                          checked={categoria === "Maquiagem"}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="form-radio"
                        />
                      </div>

                      <div className="flex items-center">
                        <label htmlFor="Casa" className="ml-2 me-2">
                          Tecnologia
                        </label>
                        <input
                          type="radio"
                          id="Tecnologia"
                          name="tipo"
                          value="Tecnologia"
                          checked={categoria === "Tecnologia"}
                          onChange={(e) => setCategoria(e.target.value)}
                          className="form-radio"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="w-6/12 ms-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Garantia em Meses</span>
                      <input
                        type="number"
                        value={garantia}
                        onChange={(e) => setGarantia(e.target.value)}
                        className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                        required
                      />
                    </label>
                  </div>
                </div>

                <div className="w-6/12 ms-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Marca:</span>
                      <input
                        type="text"
                        placeholder="Omo | Candida | Veja"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
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
        {erro}
      </div>
    </div>
  );
};

export default ProdutoForm;
