import axios from "axios";

axios.defaults.baseURL = "harmonize-backend-6405d8cae271.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export default axios;