import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// Obtener más datos de una API paginada
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.error("Error fetching more data:", err);
  }
};

// Guardar la marca de tiempo del token de actualización
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Verificar si es necesario refrescar el token
export const shouldRefreshToken = () => {
  const tokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
  const currentTime = Math.floor(Date.now() / 1000);
  return tokenTimestamp && currentTime > tokenTimestamp - 300;
};

// Eliminar la marca de tiempo del token
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
