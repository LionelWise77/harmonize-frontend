import React from "react";

function Logout({ setAuth }) {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth(false);
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
