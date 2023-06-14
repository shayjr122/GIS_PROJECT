import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "components/Sign";
import "components/Sign/Sign.css"
import src_image from "assets/icons/sign.png";
import axios from "axios";

const config = require("config.json");


export default function Signin() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (localStorage.getItem("token") && localStorage.getItem("roles")) {
        if(localStorage.getItem("roles")<= 1){
            navigate("/adminPanel");
        }else{
            navigate("/home");
        }
    }
  },[]);
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const form = {
    title: "התחברות לפורטל",
    labels: ["שם משתמש", "סיסמה"],
    inputs: [
      {
        placeholder: "הכנס שם משתמש",
        name: "username",
        type: "text",
        pattern: "^[a-zA-Z]+$",
        title: "אותיות באנגלית בלבד, בלי רווחים",
        required: true,
        value: userCred.username,
      },
      {
        placeholder: "הכנס סיסמה",
        name: "password",
        type: "password",
        value: userCred.password,
        required: true,
        title: "הכנס סיסמה",
      },
    ],
    submit: "התחבר",
    src_image,
    user: [userCred, setUserCred],
  };

  return (
    <Sign
      {...form}
      onSubmit={async (user) => {
        const { data } = await axios.post(
            `${config.api_url}/user/login`,
          user
        );
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("retoken", data.refresh_token);
          localStorage.setItem("roles", data.userData.access_level);
          localStorage.setItem("name", data.userData.fullName);
          localStorage.setItem("loginTime", new Date());
          console.log(data.userData);
          navigate(0);
        } else {
          alert("שם משתמש או סיסמה אינם נכונים");
        }
      }}
    />
  );
}