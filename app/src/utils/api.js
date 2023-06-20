import axios from "axios";
// const axios = require("axios");
const axiosApiInstance = axios.create();
const con = require("config.json");

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("token");
    config.headers = {
      "authorization": `Bearer ${access_token}`,
      Accept: "application/json",
      "content-type": "application/json; charset=utf-8"
    };
    if (!isAbsoluteURLRegex.test(config.url)) {
      config.url = con.api_host + config.url;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get(`${con.api_host}/user/refresh`,
          { headers: { "content-type": "application/json; charset=utf-8", "refresh_token": localStorage.getItem("retoken") } }
        );
        localStorage.setItem("token", res.data.access_token);
        axios.defaults.headers.common["authorization"] = `Bearer ${res.data.access_token}`;
      } catch (err) {
        console.log(err)
          localStorage.clear();
          window.history.forward('/signin')
          return Promise.reject(err);
      }
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
