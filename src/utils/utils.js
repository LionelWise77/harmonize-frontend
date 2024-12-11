import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://8000-lionelwise7-harmonizeba-ejchihmxc4o.ws.codeinstitute-ide.net/api/tasks",
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
