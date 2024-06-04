import axios from "axios";

interface User {
  id: string;
  nome: string;
  email: string;
  tel: string;
  cpf: string;
}

// let user: User | null = null;

const GetUser = async (id: string | undefined): Promise<User | null> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Users/GetUser/${id}`
    );

    if (!response || !response.data) {
      throw new Error("Não foi possível obter os dados do usuário.");
    }
    
    const resposta = response.data[0];
    const user: User = {
      id: resposta.id,
      nome: resposta.nome,
      email: resposta.email,
      tel: resposta.tel,
      cpf: resposta.cpf,
    };
    return user;
  } catch (err) {
    console.error("Erro ao buscar os dados do usuário: ", err);
    return null;
  }
};

export default GetUser;
