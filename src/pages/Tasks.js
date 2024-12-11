import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/utils";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("tasks/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

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
