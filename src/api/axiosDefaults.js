import axios from "axios";

axios.defaults.baseURL =
  "https://harmonize-backend-6405d8cae271.herokuapp.com/api/";

/*axios.defaults.baseURL =
  "https://8000-lionelwise7-harmonizeba-ejchihmxc4o.ws.codeinstitute-ide.net/api/";*/
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export default axios;
