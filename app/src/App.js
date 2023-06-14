import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";

const position = [31.646501, 34.932652];

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

export default function App() {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    // Fetch markers data from API
    fetch(
      "http://127.0.0.1:8000/facilities/search?search=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&limit=10&offset=0"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(
          data.results.filter((item) => {
            return item.geocode;
          })
        );
        // setMarkers(data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContainer center={position} zoom={9} scrollWheelZoom={false}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {/* Mapping through the markers */}
        {markers &&
          markers.map((marker) => (
            <Marker
              position={marker?.geocode}
              icon={customIcon}
              key={marker?.identification_number}
            >
              <Popup>{marker?.popup}</Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
