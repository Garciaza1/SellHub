import axios from "axios";

interface Coordenadas {
  lat: number;
  lon: number;
}

const cepToCoords = async (cep: string): Promise<Coordenadas | null> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      console.error("CEP inválido:", cep);
      return null;
    }

    const address = `${response.data.logradouro}, ${response.data.localidade}, ${response.data.uf}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    console.log(url)
    const geoResponse = await axios.get(url);
    if (geoResponse.data.length > 0) {
      return {
        lat: parseFloat(geoResponse.data[0].lat),
        lon: parseFloat(geoResponse.data[0].lon),
      };
    } else {
      console.error("Coordenadas não encontradas para o endereço:", address);
      return null;
    }
  } catch (error) {
    console.error("Erro ao converter CEP para coordenadas:", error);
    return null;
  }
};

export default cepToCoords;