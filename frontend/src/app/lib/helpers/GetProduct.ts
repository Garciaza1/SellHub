import axios from "axios";

interface Product {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  descricao: string;
  user_id: string; 
}

const GetProduct = async (id: string | string[] | undefined): Promise<Product | null> => {
  try {
    const response = await axios.get(`http://localhost:5000/Product/Get/${id}`);
    if (response.data[0]) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar o produto:", error);
    return null;
  }
};

export default GetProduct;