import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import GetCep from "../../lib/helpers/GetCep";
import Image from "next/image";
import mapa from "../../../assets/mapa.png";

interface Venda {
  cep: string;
  total_vendas: number;
  quantidade: number;
  sts_venda: string;
  venda_data: string;
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
  const [loading, setLoading] = useState(true);

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
            venda_data: new Date(sale.venda_data),
          });
        } else {
          console.error(`Coordenadas não encontradas para o CEP: ${sale.cep}`);
        }
      }
      setMarkers(markersArray);
      setLoading(false);
    };

    fetchMarkers();
  }, [salesData]);

  if (loading) {
    return (
      <div className="p-3">
        <h1 className="mx-4 text-xl font-bold">Carregando Mapa...</h1>
        <div className="map-container blur">
          <div className="map-placeholder"></div>
        </div>
      </div>
    );
  }

  if (!markers || markers.length === 0) {
    return (
      <div className="p-3" style={{ width: "250%" }}>
        <h1 className="mx-4 text-xl font-bold">Carregando Mapa...</h1>
        <div className="map-container blur">
          <Image
            className="rounded-xl p-5"
            height={400}
            quality={75}
            alt=""
            src={mapa}
            placeholder="blur"
            style={{ width: "100%" }}
          />
          <div className="map-placeholder"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3" style={{ width: "250%" }}>
      <h1 className="mx-4 text-xl font-bold ">Mapa de Vendas por CEP</h1>
      <MapContainer
        className="rounded-xl mt-2"
        center={[-14.235004, -51.92528]}
        zoom={4}
        style={{ height: "600px", width: "100%" }}
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
                "https://leafletjs.com/examples/custom-icons/leaf-green.png",
              iconSize: [38, 95],
              iconAnchor: [22, 94],
              popupAnchor: [-3, -76],
              shadowUrl:
                "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
              shadowSize: [50, 64],
              shadowAnchor: [4, 62],
            })}
          >
            <Popup>
              <strong>Quantidade:</strong> {marker.quantidade} <br />
              <strong>Ultima Venda:</strong> {marker.venda_data.toLocaleDateString()} <br />
              <strong>Total em Vendas:</strong> {marker.total_vendas} <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VendasMap;