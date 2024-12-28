import axios from "axios";

const isLocal = window.location.hostname === "localhost";
axios.defaults.baseURL = isLocal
  ? "http://localhost:8000/"
  : "https://8000-lionelwise7-harmonizeba-futj17df98x.ws.codeinstitute-ide.net/";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create(); // Para solicitudes personalizadas
export const axiosRes = axios.create(); // Para manejar respuestas

export default axios;
