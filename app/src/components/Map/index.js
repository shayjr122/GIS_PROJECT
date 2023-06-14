// import "../../../node_modules/../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";
const startPosition = [31.646501, 34.932652];

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: require("assets/icons/placeholder.png"),
  iconSize: [38, 38], // size of the icon
});

export default function Map() {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    // Fetch markers data from API
    fetch(
      "http://127.0.0.1:8000/facilities/search?search=%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91&limit=20&offset=0"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(
          data.results.filter((item) => {
            return item.geocode;
          })
        );
        setMarkers(data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <MapContainer center={startPosition} zoom={13} scrollWheelZoom={false}>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {markers && markers.map((marker,key)=>
    <Marker key={key} position={marker?.geocode} icon={customIcon}>
       <Popup>
          {marker?.popup}
        </Popup>
    </Marker>)}
    </MapContainer>
  )
}