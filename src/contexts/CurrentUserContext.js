import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { shouldRefreshToken, removeTokenTimestamp } from "../utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      console.log("Current User Data:", data);
      setCurrentUser(data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    // Interceptor para solicitudes
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            localStorage.setItem("access_token", data.access);
            config.headers.Authorization = `Bearer ${data.access}`;
          } catch (err) {
            removeTokenTimestamp();
            setCurrentUser(null);
            history.push("/signin");
          }
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    // Interceptor para respuestas
    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            const { data } = await axios.post("/dj-rest-auth/token/refresh/");
            localStorage.setItem("access_token", data.access);
            err.config.headers.Authorization = `Bearer ${data.access}`;
            return axios(err.config); // Reintenta la solicitud
          } catch (err) {
            removeTokenTimestamp();
            setCurrentUser(null);
            history.push("/signin");
          }
        }
        return Promise.reject(err);
      }
    );

    // Limpia los interceptores al desmontar
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
