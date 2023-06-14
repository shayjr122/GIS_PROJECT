import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "components/Sign";
import "components/Sign/Sign.css"
import src_image from "assets/icons/sign.png";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [userCred, setUserCred] = useState({
    selects: [{ team: "אבי" }],
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const form = {
    title: "הירשמו לפורטל",
    labels: ["שם מלא", "שם משתמש", "מייל", "סיסמה"],
    inputs: [
      {
        placeholder: "הכנס שם מלא",
        name: "fullName",
        type: "text",
        pattern: "^[a-zA-Z ]+$",
        title: "אותיות באנגלית בלבד, עם רווחים",
        required: true,
        value: userCred.fullName,
      },
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
    radioGroups: [
      {
        title: "בחר צוות:",
        name: "team",
        radios: ["אבי", "שירה"],
      },
    ],
    submit: "הירשם",
    src_image,
    user: [userCred, setUserCred],
  };

  return (
    <Sign
      {...form}
      onSubmit={async (user) => {
        user = {
          token: localStorage.getItem("token"),
          ...user,
          ...user.selects.reduce((acc, obj) => {
            return { ...acc, ...obj };
          }, {}),
        };
        delete user.selects;
        console.log(user);
        const { data } = await axios.post(
          `http://${process.env.REACT_APP_IP}/user/signup`,
          user
        );
        if (data.code === 11000) {
          alert("username already exists, try something else");
        } else {
          alert("user has been registered successfully");
          navigate("/signin");
        }
      }}
    />
  );
}
export default SignUp;
