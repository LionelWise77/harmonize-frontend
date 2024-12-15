import React, { useState } from "react";
import axios from "../api/axiosDefaults";

function Register({ setAuth }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Step 1: Register the user
    axios
      .post("dj-rest-auth/registration/", formData)
      .then((response) => {
        setSuccess(true);
        console.log("User registered successfully:", response.data);

        // Step 2: Automatically log in the user after successful registration
        axios
          .post("dj-rest-auth/login/", {
            username: formData.username,
            password: formData.password1,
          })
          .then((loginResponse) => {
            // Save tokens to localStorage
            localStorage.setItem("access_token", loginResponse.data.access);
            localStorage.setItem("refresh_token", loginResponse.data.refresh);
            setAuth(true); // Update auth state
          })
          .catch((loginError) => {
            console.error("Login failed after registration:", loginError);
            setError(
              "Registration successful, but login failed. Please log in manually."
            );
          });
      })
      .catch((err) => {
        console.error(err);
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Register</h1>
      {success && <p className="text-success">Account created successfully!</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            id="password1"
            name="password1"
            className="form-control"
            value={formData.password1}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            className="form-control"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
