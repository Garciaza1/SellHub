import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import GetCep from '../../lib/helpers/GetCep';

interface Venda {
  cep: string;
  total_vendas: number;
  quantidade: number;
  sts_venda: string;
}

interface VendasMapProps {
  salesData: Venda[];
}

interface Coordenadas {
  lat: number;
  lon: number;
}

const VendasMap: React.FC<VendasMapProps> = ({ salesData }) => {
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markersArray: any[] = [];
      for (const sale of salesData) {
        const coords = await GetCep(sale.cep);
        if (coords) {
          markersArray.push({
            position: [coords.lat, coords.lon],
            total_vendas: sale.total_vendas,
            quantidade: sale.quantidade,
            sts_venda: sale.sts_venda,
          });
        }
      }
      setMarkers(markersArray);
    };

    fetchMarkers();
  }, [salesData]);

  if (!markers || markers.length === 0) {
    return <p>No sales data available</p>;
  }

  return (
    <div style={{width: '250%'}}>
      <h1>Mapa de Vendas por CEP</h1>
      <MapContainer
        center={[-14.235004, -51.92528]}
        zoom={4}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={L.icon({
              iconUrl:
                'https://leafletjs.com/examples/custom-icons/leaf-green.png',
              iconSize: [38, 95],
              iconAnchor: [22, 94],
              popupAnchor: [-3, -76],
              shadowUrl:
                'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
              shadowSize: [50, 64],
              shadowAnchor: [4, 62],
            })}
          >
            <Popup>
              <strong>Quantidade:</strong> {marker.quantidade} <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VendasMap;