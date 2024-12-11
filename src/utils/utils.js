import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "http://8000-lionelwise7-harmonizeba-ejchihmxc4o.ws.codeinstitute-ide.net/api/tasks",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
