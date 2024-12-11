import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://8000-lionelwise7-harmonizeba-p4p9ravs0w8.ws.codeinstitute-ide.net/api/", // Reemplaza con la URL base de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
