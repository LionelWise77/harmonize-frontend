import axios from "axios";

axios.defaults.baseURL =
  "https://harmonize-backend-6405d8cae271.herokuapp.com/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; //

export default axios;
