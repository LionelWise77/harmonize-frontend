import React from "react";
import "../App.module.css";

function Logout({ setAuth }) {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth(false);
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
