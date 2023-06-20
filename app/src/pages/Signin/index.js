import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "components/Sign";
import "components/Sign/Sign.css";
import src_image from "assets/icons/sign.png";
import axios from "axios";

const config = require("config.json");

export default function Signin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      if (localStorage.getItem("role") === "ADMIN") {
        navigate("/adminPanel");
      } else {
        navigate("/home");
      }
    }
  }, []);
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const form = {
    title: "התחברות לפורטל",
    labels: ["מייל", "סיסמה"],
    inputs: [
      {
        placeholder: "הכנס מייל",
        name: "email",
        type: "email",
        title: "הכנס מייל",
        required: true,
        value: userCred.email,
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
        try {
          const response = await axios.post(
            `http://${config.api_host}/user/login`,
            { email: user.email, password: user.password }
          );

          if (response.status === 200) {
            console.log(response);
            localStorage.setItem("token", response.data.access_token);
            localStorage.setItem("retoken", response.data.refresh_token);
            localStorage.setItem("role", response.data.userData.role);
            localStorage.setItem("name", response.data.userData.fullName);
            localStorage.setItem("loginTime", new Date());
            navigate(0);
          } else {
            alert("שם משתמש או סיסמה אינם נכונים");
          }
        } catch (error) {
          alert("שם משתמש או סיסמה אינם נכונים");
        }
        // if (data.success) {
        //   localStorage.setItem("token", data.token);
        //   localStorage.setItem("retoken", data.refresh_token);
        //   localStorage.setItem("roles", data.userData.access_level);
        //   localStorage.setItem("name", data.userData.fullName);
        //   localStorage.setItem("loginTime", new Date());
        //   console.log(data.userData);
        //   navigate(0);
        // } else {
        //   alert("שם משתמש או סיסמה אינם נכונים");
        // }
      }}
    />
  );
}
