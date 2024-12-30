// Importaciones necesarias
import jwtDecode from "jwt-decode";
import { axiosReq, axiosRes } from "./api/axiosDefaults";
import { useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

// Obtener más datos de una API paginada
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: [
        ...prevResource.results,
        ...data.results.filter(
          (item) =>
            !prevResource.results.some((prevItem) => prevItem.id === item.id)
        ),
      ],
    }));
  } catch (err) {
    console.error("Error fetching more data:", err);
  }
};

export const setTokenTimestamp = (data) => {
  try {
    if (data?.refresh_token) {
      const refreshTokenTimestamp = jwtDecode(data.refresh_token).exp;
      localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
    }
  } catch (err) {
    console.error("Error decoding token:", err);
  }
};

// Verificar si es necesario refrescar el token
export const shouldRefreshToken = () => {
  const tokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
  if (!tokenTimestamp) return false;

  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime > tokenTimestamp - 300;
};

// Eliminar la marca de tiempo del token
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};

// Refrescar el token de acceso usando axios
export const refreshToken = async () => {
  try {
    const { data } = await axiosRes.post("/dj-rest-auth/token/refresh/");
    setTokenTimestamp(data);
    return data.access_token;
  } catch (err) {
    console.error("Error refreshing token:", err);
    removeTokenTimestamp();
    throw err;
  }
};

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const updateCurrentUser = async () => {
    try {
      const { data } = await axiosReq.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentUser(null);
    }
  };

  return { currentUser, setCurrentUser, updateCurrentUser };
};

// Cerrar sesión y limpiar datos
export const logoutUser = (setCurrentUser) => {
  try {
    removeTokenTimestamp();
    setCurrentUser(null);
    localStorage.clear();
  } catch (err) {
    console.error("Error during logout:", err);
  }
};
