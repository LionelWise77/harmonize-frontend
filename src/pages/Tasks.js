import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("tasks/")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <h1>Tasks</h1>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <h1>Tasks</h1>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item">
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>Due Date: {task.due_date}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
}

export default Tasks;
