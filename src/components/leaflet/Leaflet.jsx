import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const fetchCoordinates = async (address) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
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
  console.log("Received addresses:", addresses); // Log addresses

  useEffect(() => {
    const fetchAllCoordinates = async () => {
      const coords = await Promise.all(addresses.map(async (addressObj) => {
        const address = `${addressObj.street}, ${addressObj.postalCode} ${addressObj.city},${addressObj.country}`;
 
        try {
          const { lat, lon } = await fetchCoordinates(address);
          return { address, lat, lon };
        } catch (error) {
          console.error(`Error fetching coordinates for ${address}:`, error);
          return null;
        }
      }));
      setMarkers(coords.filter(Boolean)); // Filter out any null values
      console.log("Markers state:", coords.filter(Boolean)); // Log markers state
    };

    fetchAllCoordinates();
  }, [addresses]);

  return (
    <MapContainer center={[46.227638,2.213749]} zoom={5} style={{ height: "60vh", width: "80%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lon]}>
          <Popup>{marker.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
