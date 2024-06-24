"use client";
import axios from "axios";
import React, { useState, useEffect, FormEvent, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface EditProdutoProps {
  id: string;
}

const EditProduto: React.FC<EditProdutoProps> = ({ id }) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>({
    nome: "",
    descricao: "",
    imagem: "",
    imagem_nome: "",
    preco: "",
    quantidade: "",
    codigo: "",
    garantia: "",
    categoria: "",
    marca: "",
    user_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [imagemProduto, setImagemProduto] = useState<File | null>(null);
  const [imagemNome, setImagemNome] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/Product/Get/${id}`
        );
        setProduct(response.data[0]);
      } catch (err) {
        setError("Erro ao enviar os dados: " + err);
      } finally {
        console.log(product)
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result && typeof result === 'string') {
          setImagemProduto(result);
        }
      };
      reader.readAsDataURL(file);
      setImagemNome(file.name);
    }
  };

  const handleProductEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("nome", product.nome);
    formData.append("descricao", product.descricao);
    formData.append("preco", product.preco);
    formData.append("quantidade", product.quantidade);
    formData.append("codigo", product.codigo);
    formData.append("garantia", product.garantia);
    formData.append("categoria", product.categoria);
    formData.append("marca", product.marca);
    formData.append("user_id", product.user_id);

    if (imagemProduto) {
      formData.append("imagem", imagemProduto);
      formData.append("imagem_nome", imagemNome);
    }

    try {
        console.log()
      const response = await axios.put(
        "http://localhost:5000/Products/Put/Edit",
        {
            nome:product.nome,
            descricao: product.descricao, 
            imagem: imagemProduto, 
            imagem_nome: imagemNome,
            preco: product.preco, 
            quantidade: product.quantidade, 
            codigo: product.codigo, 
            garantia: product.garantia, 
            categoria: product.categoria, 
            marca: product.marca, 
            user_id: product.user_id,
            id
        }
      );
      if (response.data) {
        console.log(response.data);
        router.push("/Sellers/MeusProdutos");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const clearFileInput = () => {
    setImagemProduto(null);
    setImagemNome("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  if (loading) {
    return <></>;
  }

  return (
    <div className="w-8/12 mx-auto">
      <div className="bg-zinc-950 p-8 rounded-xl w-full">
        <form onSubmit={handleProductEdit}>
          <div className="flex justify-evenly">
            {/* metade da esquerda */}
            <div className="w-6/12 mx-1">
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  <span className="block text-lg">Nome do produto:</span>
                  <input
                    type="text"
                    value={product.nome}
                    onChange={(e) =>
                      setProduct({ ...product, nome: e.target.value })
                    }
                    className="py-1 rounded-xl w-full mt-2  bg-zinc-700 text-center"
                    required
                  />
                </label>
              </div>

              <div className="my-2">
                <label className="block mb-2 font-medium">
                  <span className="block text-lg">Descrição Do Produto:</span>
                  <textarea
                    value={product.descricao}
                    onChange={(e) =>
                      setProduct({ ...product, descricao: e.target.value })
                    }
                    className="py-3 ps-3 rounded-xl w-full mt-2 bg-zinc-700 "
                    required
                  ></textarea>
                </label>
              </div>

              <div className="my-3  flex-col ">
                <span className="block text-lg">Imagem do Produto:</span>
                <p className="text-red-600 text-sm">Se não quiser trocar apenas deixe como está!</p>
                <label className="block mb-2 font-medium cursor-pointer flex justify-center mt-2 bg-zinc-900 hover:bg-zinc-700 py-1 rounded-lg w-8/12 ms-20">
                  Selecione
                  <input
                    type="file"
                    name="imagemProduto"
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </label>
                {imagemProduto && (
                  <label className={`w-10/12 border rounded-xl p-2 ms-10`}>
                    {imagemNome}
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
                )}
                <div className="flex justify-start pt-3 h-20">
                    <p className="text-sm mx-3">Imagem antiga =&gt;</p>
                <img src={product.imagem} alt={product.imagem_nome} className="mb-0 pb-0" />
                </div>
              </div>
            </div>

            {/* metade da direita */}
            <div className="">
              <div className="w-full mx-1 flex ">
                <div className="w-6/12 mx-2">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Quantidade em estoque:</span>
                      <input
                        type="number"
                        step={"1"}
                        value={product.quantidade}
                        onChange={(e) =>
                          setProduct({ ...product, quantidade: e.target.value })
                        }
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
                        value={product.preco}
                        onChange={(e) =>
                          setProduct({ ...product, preco: e.target.value })
                        }
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
                      value={product.codigo}
                      onChange={(e) =>
                        setProduct({ ...product, codigo: e.target.value })
                      }
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
                    <input
                      type="text"
                      value={product.categoria}
                      onChange={(e) =>
                        setProduct({ ...product, categoria: e.target.value })
                      }
                      className="p-1 rounded-xl w-full mt-2 bg-zinc-700 text-center"
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex">
                <div className="w-6/12 ms-4">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium">
                      <span className="block text-lg">Garantia em Meses</span>
                      <input
                        type="number"
                        value={product.garantia}
                        onChange={(e) =>
                          setProduct({ ...product, garantia: e.target.value })
                        }
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
                        value={product.marca}
                        onChange={(e) =>
                          setProduct({ ...product, marca: e.target.value })
                        }
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
              className="text-white bg-zinc-900 hover:bg-zinc-700 rounded-lg px-3 py-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProduto;
