import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const cafeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2935/2935032.png",
  iconSize: [35, 35],
});

const MapView = ({ cafes, position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) map.setView(position, 14);
  }, [position, map]);

  return (
    <>
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cafes.map((cafe, i) => (
        <Marker key={i} position={[cafe.lat, cafe.lon]} icon={cafeIcon}>
          <Popup>{cafe.name || "Unnamed Café"}</Popup>
        </Marker>
      ))}
    </>
  );
};

export default MapView;
