import axios from "axios";

axios.defaults.baseURL = "https://harmonize-backend-6405d8cae271.herokuapp.com";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// Create instances for requests and responses
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add a request interceptor to include the token in the headers
axiosReq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Adjust this line based on how you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
