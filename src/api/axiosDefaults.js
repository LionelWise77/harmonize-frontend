import axios from "axios";

const isLocal = window.location.hostname === "localhost";
const baseURL = isLocal
  ? "http://localhost:8000/"
  : "https://8000-lionelwise7-harmonizeba-rqih9n6nle6.ws.codeinstitute-ide.net/";

axios.defaults.baseURL = `${baseURL}api/`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; // Incluye cookies en las solicitudes

export const axiosReq = axios.create({
  baseURL: `${baseURL}api/`,
});

export const axiosRes = axios.create({
  baseURL: `${baseURL}api/`,
});

export default axios;
