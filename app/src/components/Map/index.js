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

export default function Map({ markers }) {
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
          <Marker
            key={marker?.identification_number}
            position={marker?.geocode}
            icon={customIcon}
          >
            <Popup>
              <div className="popuptext">
                <div className="poupline">
                  <div className="popuppropertiy">שם המתקן:</div>
                  <div className="popupvalue">{marker?.facility_name}</div>
                </div>
                <div className="poupline">
                  <div className="popuppropertiy">רשות מקומית:</div>
                  <div className="popupvalue">{marker?.local_authority}</div>
                </div>
                <div className="poupline">
                  <div className="popuppropertiy">רחוב:</div>
                  <div className="popupvalue">{marker?.street}</div>
                </div>
                <div className="poupline">
                  <div className="popuppropertiy">מספר:</div>
                  <div className="popupvalue">{marker?.house_number}</div>
                </div>
                <div className="poupline">
                  <div className="popuppropertiy">בעלים:</div>
                  <div className="popupvalue">{marker?.facility_owners}</div>
                </div>
                <div className="poupline">
                  <div className="popuppropertiy">פנוי לפעילות:</div>
                  <div className="popupvalue">
                    {marker?.available_for_activities}
                  </div>
                </div>
                <div className="poupline">
                  <div className="popuppropertiy">תקינות המתקן:</div>
                  <div className="popupvalue">{marker?.facility_status}</div>
                </div>

                {marker?.contact_person_phone &&
                marker.contact_person_phone !== "null" &&
                marker?.contact_person_email &&
                marker.contact_person_email !== "null" ? (
                  <div className="poupline">
                    <div className="popuppropertiy">פרטי איש קשר:</div>
                    <div className="popupvalue">
                      {marker?.contact_person_phone &&
                      marker.contact_person_phone !== "null"
                        ? marker.contact_person_phone
                        : "" + "| " + marker?.contact_person_email &&
                          marker.contact_person_email !== "null"
                        ? marker.contact_person_email
                        : "" + "| "}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
