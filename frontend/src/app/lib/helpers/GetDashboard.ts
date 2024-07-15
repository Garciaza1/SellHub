import axios from "axios";

interface Soma {
  quantidade: string;
  total: string;
  vendas: string;
}
interface MtdPay {
  mtd_pay: string;
  numero_vendas: number;
}

interface Venda {
  venda_data: string;
  total_vendas: string;
  numero_vendas: number;
  quantidade: number;
  cep: string;
  mtd_pay: string; // Verifique se esse tipo é apropriado, pode ser necessário ajustar
  sts_venda: string; // Verifique se esse tipo é apropriado, pode ser necessário ajustar
}

interface Data {
  Data: [];
}

export const getDataVendedorPorDia = async (
  id: string | undefined
): Promise<Venda[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Dashboard/Vendedor/PorDia/${id}`
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar os dados do vendedor do dia:", error);
    return [];
  }
};

export const getDataVendedorDoDia = async (
  id: string | undefined
): Promise<Venda[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Dashboard/Vendedor/DoDia/${id}`
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar os dados do vendedor do dia:", error);
    return [];
  }
};

export const getMtdPay = async (
  id: string | string[] | undefined
): Promise<MtdPay[] | null> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Dashboard/Vendedor/MtdPay/${id}`
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar os dados do vendedor do dia:", error);
    return [];
  }
};

export const getSomas = async (id: string | undefined): Promise<Soma[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Dashboard/Vendedor/Somas/${id}`
    );
    if (response.data) {
      console.log(response.data);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar os dados do vendedor do dia:", error);
    return [];
  }
};

export const getDataCliente = async (
  id: string | string[] | undefined
): Promise<Data[] | null> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/Dashboard/Cliente/DoDia/${id}`
    );
    if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar os dados do cliente:", error);
    return null;
  }
};
