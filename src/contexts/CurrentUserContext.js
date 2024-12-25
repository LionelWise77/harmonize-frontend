import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosDefaults";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("User not authenticated");
        setCurrentUser(null);
      } else {
        console.error("Error fetching current user:", err);
      }
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
