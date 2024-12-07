import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/lotteryweb", // url = base url + request url
  timeout: 10000, // request timeout
});

service.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers["Authorization"] = getToken();
      config.headers.token = getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log("res:", res);
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
