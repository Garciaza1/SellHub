import axios from "axios";
interface Carrinho {
  id: string;
  id_vendedor: string;
  user_id: string;
  product_id: string;
  quantidade: string;
  nome: string;
  garatia: number;
  imagem: string;
}
const getCarrinho = async (id: string): Promise<Carrinho | null > => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Carrinho/Get/${id}`
    );

    if (response && response.data) {
      // console.log(response.data);
      return response.data;
    }

    return null;
  } catch (err) {
    console.error("Erro ao pegar os dados: " + err);
    return null;
  }
};

export default getCarrinho;
