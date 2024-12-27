import jwtDecode from "jwt-decode";
import { axiosReq } from "./api/axiosDefaults";

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

// Guardar la marca de tiempo del token de actualización
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
