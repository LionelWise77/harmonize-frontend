import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../api/axiosDefaults";

function Login({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("token/", { username, password })
      .then((response) => {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        setAuth(true);
        history.push("/tasks"); // Redirige a la página de tareas
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
