import React, { useState } from "react";
import Map from "components/Map";
import SearchBox from "components/SearchBox";
import "./Home.css";
import axios from "utils/api";
export default function Home() {
  const inputs = {
    searchBox:{
      placeholder:'לדוגמא: כדורסל תל-אביב'
    },
    spinners:[
      {
        placeholder:'רשות מקומית',
        items:[
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
          'אבו גוש',
          'אבו סנאן',
          'אבן יהודה',
        ]
      },
      {
        placeholder:'סוג מתקן',
      },
      {
        placeholder:'שם מתקן'
      },
      {
        placeholder:'תאורה קיימת'
      },
      {
        placeholder:'גידור קיים'
      },
      {
        placeholder:'פנוי לפעילות'
      },
      {
        placeholder:'מספר תוצאות'
      }
    ]
  } 
  const [locations,setLocations]=useState([])

  const handle_search = async (filter)=>{
    console.log(JSON.stringify(filter));
    const params = {
      filters:JSON.stringify(filter),
      offset:0,
      limit:5,
    }
    try {
      const {data} = await axios.get("/facilities/filter",{params})
      setLocations(data.results);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
    <div className="home-main-grid">
        <div className="half-grid">
          <SearchBox {...inputs} onSubmitCallback={handle_search}/>
        </div>
        <div className="half-grid">
          <Map markers={locations}/>
        </div>
    </div>
    </div>
  );
}
