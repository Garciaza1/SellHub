import axios from 'axios';
import { getServerSession } from 'next-auth/next';

// Interface para a sessão do usuário
interface UserSession {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  cpf: string;
}

// Variável para armazenar a sessão do usuário
let userSession: UserSession | null = null;

// Função para buscar a sessão do usuário  IMPORTANTE SO PODE PUXAR SE TIVER COM O EMAIL SE NAO FODE A SESSAO TODA
const fetchUserSession = async (): Promise<UserSession | null> => {
  try {
    // Obtém a sessão do NextAuth
    const session = await getServerSession();
    
    if (session) {
      const email = session.user?.email;
      
      if (!email) {
        throw new Error('Email not found in session');
      }
      
      // Faz a requisição para buscar os dados do usuário
      const response = await axios.get(`http://localhost:5000/Users/FetchUser/${email}`);
      
      // console.log(response.data);

      // Mapeia os dados da resposta para a interface UserSession
      userSession = {
        id: response.data.id,
        nome: response.data.nome,
        tipo: response.data.tipo,
        email: response.data.email,
        cpf: response.data.cpf
      };
      
      return userSession;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching session data:', error);
    return null;
  }
};

// Exporta a função fetchUserSession como padrão
export default fetchUserSession;