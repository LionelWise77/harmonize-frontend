import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Estado del usuario autenticado
  const history = useHistory();

  // Función para montar y verificar el usuario autenticado
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/"); // Ajusta esta ruta si es necesario
      setCurrentUser(data);
    } catch (err) {
      console.log("Error al obtener usuario:", err);
    }
  };

  // Llamada inicial para verificar el usuario al montar el componente
  useEffect(() => {
    handleMount();
  }, []);

  // Configuración de interceptores para manejar tokens y errores
  useMemo(() => {
    // Interceptor para solicitudes
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/"); // Ajusta esta ruta si es necesario
        } catch (err) {
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin"); // Redirige al login si el usuario no está autenticado
            }
            return null;
          });
          return config;
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
            await axios.post("/dj-rest-auth/token/refresh/"); // Intenta refrescar el token
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config); // Reintenta la solicitud con el nuevo token
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
