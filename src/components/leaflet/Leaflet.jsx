import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fetchCoordinates = async (address) => {
  const response = await fetch(`http://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
  const data = await response.json();

  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  } else {
    throw new Error("Coordinates not found for the given address.");
  }
};

const LeafletMap = ({ addresses }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchAllCoordinates = async () => {
      const coords = await Promise.all(addresses.map(async (addressObj) => {
        const address = `${addressObj.street}, ${addressObj.postalCode}, ${addressObj.city}, ${addressObj.country}`;
 
        try {
          const { lat, lon } = await fetchCoordinates(address);
          return { address, lat, lon };
        } catch (error) {
          console.error(`Error fetching coordinates for ${address}:`, error);
          return null;
        }
      }));
      const validCoords = coords.filter(Boolean);
      setMarkers(validCoords);
      
      if (validCoords.length === 0) {
        console.warn("No valid coordinates found.");
      }
    };

    fetchAllCoordinates();
  }, [addresses]);

  return (
    <MapContainer center={[46.227638, 2.213749]} zoom={6} style={{ height: "900px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={marker.address} position={[marker.lat, marker.lon]}>
          <Popup>{marker.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
