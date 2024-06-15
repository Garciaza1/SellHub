import axios from 'axios';

interface Coordenadas {
  lat: number;
  lon: number;
}

const cepToCoords = async (cep: string): Promise<Coordenadas | null> => {
  try {
    // Construa a URL da requisição para o serviço de geocodificação do OpenStreetMap
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${cep}&format=json&limit=1`;

    // Faça a requisição HTTP usando axios
    const response = await axios.get(url);

    // Verifique se houve uma resposta e se há dados válidos
    if (response.data && response.data.length > 0) {
      const firstResult = response.data[0];
      const lat = parseFloat(firstResult.lat);
      const lon = parseFloat(firstResult.lon);
      return { lat, lon };
    } else {
      console.error('Nenhuma coordenada encontrada para o CEP fornecido.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao converter CEP para coordenadas:', error);
    return null;
  }
};

export default cepToCoords;