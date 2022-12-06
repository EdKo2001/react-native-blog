// import { Navigate } from "react-router-dom";

import axios from "axios";

import { API_URL } from "@env";

const instance: any = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config: any) => {
    // config.headers!.Authorization =
    //   "Bearer " + window.localStorage.getItem("token");

    return config;
  },
  (error: any) => {
    if (error?.response?.status === 401) {
      console.log("error");
      // return <Navigate to="/" />;
      return;
    }

    return Promise.reject(error);
  }
);

export default instance;
