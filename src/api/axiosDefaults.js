import axios from "axios";

axios.defaults.baseURL =
  "https://8000-lionelwise7-harmonizeba-futj17df98x.ws.codeinstitute-ide.net/";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const axiosReq = axios.create(); // Para solicitudes personalizadas
export const axiosRes = axios.create(); // Para manejar respuestas

export default axios;
