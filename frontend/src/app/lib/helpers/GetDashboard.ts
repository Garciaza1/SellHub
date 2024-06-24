import axios from "axios";

interface Data {
  Data: [];
}
export const getDataVendedorPorDia = async (
    id: string | string[] | undefined
  ): Promise<Data[] | null> => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Dashboard/Vendedor/PorDia/${id}`
      );
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar os dados do vendedor por dia:", error);
      return null;
    }
  };
  
  export const getDataVendedorDoDia = async (
    id: string | string[] | undefined
  ): Promise<Data | null> => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Dashboard/Vendedor/DoDia/${id}`
      );
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar os dados do vendedor do dia:", error);
      return null;
    }
  };

  export const getMtdPay = async (
    id: string | string[] | undefined
  ): Promise<Data | null> => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Dashboard/Vendedor/MtdPay/${id}`
      );
      if (response.data) {
        console.log(response.data)
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar os dados do vendedor do dia:", error);
      return null;
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