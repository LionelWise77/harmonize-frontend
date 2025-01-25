import axios from "axios";

axios.defaults.baseURL =
  "https://8000-lionelwise7-harmonizeba-39ldxkh93bi.ws.codeinstitute-ide.net";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const axiosReq = axios.create();
export const axiosRes = axios.create();
export default axios;
