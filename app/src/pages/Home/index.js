import React, { useEffect, useState } from "react";
import Map from "components/Map";
import SearchBox from "components/SearchBox";
import "./Home.css";
import axios from "utils/api";
import { redirect } from "react-router-dom";
const placeholder = require("placeholders.json");

export default function Home() {
  const inputs = {
    searchBox: {
      placeholder: "לדוגמא: כדורסל תל-אביב",
    },
    spinners: [
      {
        placeholder: "רשות מקומית",
        items: placeholder["authorities"],
      },
      {
        placeholder: "סוג מתקן",
        items: placeholder["facility_type"],
      },
      {
        placeholder: "שם מתקן",
        items: placeholder["facility_name"],
      },
      {
        placeholder: "תאורה קיימת",
        items: placeholder["light"],
      },
      // {
      //   placeholder: "גידור קיים",
      //   items: placeholder["border"],
      // },
      {
        placeholder: "פנוי לפעילות",
        items: placeholder["available"],
      },
      {
        placeholder: "מספר תוצאות",
        items: placeholder["limit"],
      },
    ],
  };
  const [locations, setLocations] = useState([]);
  const [like_locations, setLikeLocations] = useState([]);

  useEffect(() => {
    const set_like_locations = async () => {
      try {
        const { data } = await axios.get("/facilities/like");
        setLikeLocations(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    set_like_locations();
    console.log("like_locations", like_locations);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handle_search = async (filter) => {
    Object.keys(filter).forEach((key) => {
      if (filter[key] === "") delete filter[key];
    });
    console.log(JSON.stringify(filter));
    const params = {
      filters: JSON.stringify(filter),
      offset: 0,
      limit: 5,
    };
    try {
      const { data } = await axios.get("/facilities/filter", { params });
      setLocations(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handle_logout = (e) => {
    localStorage.clear();
    console.log("dsds");
    window.location.href = window.location.href + "/../Signin";
  };

  return (
    <div className="all">
      <div>
        <input
          className="logout-btn"
          type="submit"
          value={"התנתק"}
          onClick={handle_logout}
        />
      </div>
      <div className="home-main-grid">
        <div className="half-grid">
          <div className="quart-grid-top">
            <div className="tableFixHead center">
              <SearchBox {...inputs} onSubmitCallback={handle_search} />
            </div>
          </div>
          <div className="cheat"></div>
          <div className="quart-grid-bottom">
            <div className="tableFixHead">
              <table>
                <thead>
                  <tr>
                    <th>מספר זיהוי</th>
                    <th>סוג מתקן</th>
                    <th>שם המתקן</th>
                    <th>רשות מקומית</th>
                    <th>טלפון איש קשר</th>
                    <th>דואל איש קשר</th>
                  </tr>
                </thead>
                <tbody>
                  {like_locations &&
                    like_locations.map &&
                    like_locations.map((location, key) => {
                      console.log(location);
                      return (
                        <tr key={key}>
                          <td>{location.identification_number}</td>
                          <td>{location.facility_type}</td>
                          <td>{location.facility_name}</td>
                          <td>{location.local_authority}</td>
                          <td>{location.contact_person_phone}</td>
                          <td>{location.contact_person_email}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="half-grid">
          <Map markers={locations} />
        </div>
      </div>
    </div>
  );
}
