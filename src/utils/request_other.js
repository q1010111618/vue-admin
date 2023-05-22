import axios from "axios";

const service = axios.create({
  baseURL: "/other", // url = base url + request url
  timeout: 10000, // request timeout
});

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
