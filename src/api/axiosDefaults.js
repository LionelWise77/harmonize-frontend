import axios from "axios";

//axios.defaults.baseURL =
//  "https://harmonize-backend-6405d8cae271.herokuapp.com/api/";

axios.defaults.baseURL =
  "https://8000-lionelwise7-harmonizeba-enzgix52z0z.ws.codeinstitute-ide.net/api/";

axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosRec = axios.create();
export const axiosRes = axios.create();

export default axios;
