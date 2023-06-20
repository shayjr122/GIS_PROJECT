// import "../../../node_modules/../node_modules/leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";
import "./map.css";
const startPosition = [31.646501, 34.932652];

const config = require("config.json");

// create custom icon
const customIcon = new Icon({
  iconUrl: require("assets/icons/placeholder.png"),
  iconSize: [38, 38], // size of the icon
});

export default function Map({markers}) {
  return (
    <MapContainer
      className="leaflet-container"
      center={startPosition}
      zoom={9}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers &&
      markers.map &&
        markers.map((marker, key) => (
          <Marker key={key} position={marker?.geocode} icon={customIcon}>
            <Popup>{marker?.popup}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
