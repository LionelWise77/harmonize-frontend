import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/utils";

function Tasks() {
  // Estado para manejar las tareas
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener las tareas del backend
  useEffect(() => {
    axiosInstance
      .get("tasks/") // Llamada al endpoint /api/tasks/
      .then((response) => {
        setTasks(response.data); // Guardar las tareas en el estado
        setLoading(false); // Detener el loading
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Error fetching tasks. Please try again later.");
        setLoading(false); // Detener el loading
      });
  }, []);

  // Renderizar el contenido basado en el estado
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
