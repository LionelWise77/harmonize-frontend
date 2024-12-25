import React from "react";
import axios from "../api/axiosDefaults";

function Logout({ setAuth }) {
  const handleLogout = async () => {
    try {
      await axios.post(
        "/dj-rest-auth/logout/",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("access_token");
      setAuth(false);
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed:", err.response || err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Logout</h2>
      <p>Are you sure you want to log out?</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
