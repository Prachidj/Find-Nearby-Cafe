import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const userIcon = new L.DivIcon({
  className: "user-icon",
  html: "<div style='font-size:40px;'>🧍</div>",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const cafeIcon = new L.DivIcon({
  className: "cafe-icon",
  html: "<div style='font-size:30px;'>📍</div>", // bigger emoji
  iconSize: [30, 30], // adjust size
  iconAnchor: [18, 28], // anchor to bottom center
});

export default function App() {
  const [position, setPosition] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ 1️⃣ Get user's current location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          await fetchCafes(latitude, longitude);
          setLoading(false);
        },
        async (err) => {
          console.warn("Location permission denied:", err);
          // fallback to Mumbai
          setPosition([19.076, 72.8777]);
          await fetchCafes(19.076, 72.8777);
          setLoading(false);
        }
      );
    } else {
      setPosition([19.076, 72.8777]);
      fetchCafes(19.076, 72.8777);
      setLoading(false);
    }
  }, []);

  // ✅ 2️⃣ Fetch nearby cafes (OpenStreetMap Overpass API)
  const fetchCafes = async (lat, lon) => {
    try {
      const query = `
        [out:json];
        node(around:2000,${lat},${lon})["amenity"="cafe"];
        out;
      `;
      const res = await axios.get("https://overpass-api.de/api/interpreter", {
        params: { data: query },
      });
      const data = res.data.elements.map((el) => ({
        id: el.id,
        name: el.tags.name || "Unnamed Café",
        lat: el.lat,
        lon: el.lon,
      }));
      setCafes(data);
    } catch (error) {
      console.error("Error fetching cafes:", error);
    }
  };

  // ✅ 3️⃣ Search place using OpenCage API
  const handleSearch = async () => {
    if (!query) return;
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: query,
            key: "b9fe3f4dde654a498b48879048b5004a", // Replace with your OpenCage key
          },
        }
      );
      const { lat, lng } = res.data.results[0].geometry;
      setPosition([lat, lng]);
      await fetchCafes(lat, lng);
      setLoading(false);
    } catch (err) {
      console.error("Search error:", err);
      setLoading(false);
    }
  };

  if (loading || !position) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Loading map...</h2>
      </div>
    );
  }

  // ✅ 4️⃣ Render map + cafes + search bar
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {/* 🔍 Search Bar */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder="Search city or area..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* 🗺️ Map */}
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={true}
        doubleClickZoom={true}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 📍 User marker */}
        <Marker position={position} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* ☕ Café markers */}
        {cafes.map((cafe) => (
          <Marker key={cafe.id} position={[cafe.lat, cafe.lon]} icon={cafeIcon}>
            <Popup>{cafe.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
