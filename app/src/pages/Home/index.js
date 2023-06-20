import React from "react";
import Map from "components/Map";
import SearchBox from "components/SearchBox";
import "./Home.css";
export default function Home() {
  return (
    <div className="page-container">
      <table className="table">
        <thead>
          <tr>
            <th colSpan={2} className="header">
              חפש את מתקן הספורט שהכי מתאים לך
            </th>
            <th colSpan={2} className="search-box">
              <SearchBox title={"גדגדגגד"} onSubmit={(e) => {}} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2} className="map">
              <Map />
            </td>
            <td colSpan={2} className="advance-search">
              Advance Search Parameters
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    // );
    // return (
    //   <div className="page-container">
    //     <div className="header">Header</div>
    //     <div className="content-container">
    //       <div className="map">
    //         <Map />
    //       </div>
    //       <div className="search-box">Search Box</div>
    //       <div className="advance-search">Advance Search Parameters</div>
    //     </div>
    //   </div>
  );
}
