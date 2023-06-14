import "../node_modules/leaflet/dist/leaflet.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { createRoot } from "react-dom/client";

import { ProtectedRoutes, AdminRoutes } from "components/ProtectedRoutes";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "pages/Home";
import Signin from "pages/Signin";
import SignUp from "pages/Signup";
import Welcome from "pages/Welcome";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/signUp" element={<SignUp />}></Route>
      <Route element={<ProtectedRoutes />}>
        {/* user routes */}
        <Route path="/home" element={<Home />}></Route>
        
        <Route element={<AdminRoutes />}>
          {/* admin routes */}
              <Route path="/adminPanel" element={<></>}></Route>
          </Route>
      </Route>
  </Routes>
</BrowserRouter>
);
