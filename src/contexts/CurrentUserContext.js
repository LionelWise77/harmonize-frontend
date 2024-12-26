import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";

// Contextos para compartir el usuario actual
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
      setCurrentUser(data); // Establece el usuario actual
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useMemo(() => {
    // Interceptor para solicitudes salientes
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/"); // Intenta refrescar el token
        } catch (err) {
          setCurrentUser(null);
          history.push("/signin");
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Interceptor para respuestas
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            return axios(err.config); // Reintenta la solicitud
          } catch (err) {
            setCurrentUser(null);
            history.push("/signin");
          }
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
