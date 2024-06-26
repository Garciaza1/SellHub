import axios from "axios";

interface Product {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  codigo: string;
  descricao: string;
  garantia: number;
  categoria: string;
  marca: string;
  quantidade: number;
  user_id: string;
}

const GetCategoria = async (categoria: string): Promise<Product | null> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Categoria/Get/${categoria}`
    );

    if(response.data){
        console.log(response.data);
        return response.data;
    }

    return null;

  } catch (err) {
    console.error("Erro ao enviar os dados: " + err);
    return null;
  }
};

export default GetCategoria;