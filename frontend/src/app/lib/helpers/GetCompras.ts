import axios from "axios";
interface Compras {
    id: string;
    vendedor_id:string;
    user_id:string;
    product_id:string;
    quantidade:string;
    created_at:string;
    updated_at:string;
    deleted_at:string;
    endereco:string;
    num_residencia:number;
    cpf:string;
    cep:string;
    mtd_pay:string;
    sts_venda:string;
    nome:string;
    garatia:number;
    imagem:string;
    
}
const getCompras = async (id: string): Promise<Compras | null> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Vendas/Get/Compras/${id}`
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

export default getCompras;
