import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://8000-lionelwise7-harmonizeba-p4p9ravs0w8.ws.codeinstitute-ide.net/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
