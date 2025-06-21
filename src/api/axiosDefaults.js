import axios from "axios";

axios.defaults.baseURL =
  "https://harmonize-backend-6405d8cae271.herokuapp.com/";
/*("http://localhost:8000/"); // Cambia esto a tu URL de backend*/
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

export const axiosReq = axios.create();
export const axiosRes = axios.create();
export default axios;
