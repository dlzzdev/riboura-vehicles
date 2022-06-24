import axios from "axios";
const defaultOptions = {
  baseURL: `${process.env.REACT_APP_API || "http://localhost:3333"}`,
  headers: {
    "Content-Type": "application/json",
  },
};

let api = axios.create(defaultOptions);

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
