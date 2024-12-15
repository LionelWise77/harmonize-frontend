import React from "react";
import { useHistory } from "react-router-dom";

function Logout({ setAuth }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth(false);
    history.push("/"); // Redirige al Home
  };

  return (
    <div className="container mt-4">
      <h1>Logout</h1>
      <p>Are you sure you want to log out?</p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
