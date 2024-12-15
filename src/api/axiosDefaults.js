import axios from "axios";

axios.defaults.baseURL =
  "https://harmonize-backend-6405d8cae271.herokuapp.com/api/";

/*axios.defaults.baseURL =
  "https://8000-lionelwise7-harmonizeba-ejchihmxc4o.ws.codeinstitute-ide.net/api/";*/
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
