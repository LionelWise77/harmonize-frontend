import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("tasks/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Unable to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
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
