import React, { useState } from "react";
import axios from "../api/axiosDefaults";

function TaskCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("tasks/", { title, description })
      .then((response) => {
        setSuccess(true);
        setError(null);
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to create task. Please check authentication.");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Create Task</h1>
      {success && <p className="text-success">Task created successfully!</p>}
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default TaskCreate;
