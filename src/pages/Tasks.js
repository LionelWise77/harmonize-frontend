import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import TaskForm from "./TaskForm";
import styles from "../styles/Task.module.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [errors, setErrors] = useState(null);

  // Fetch de tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("api/tasks/");
        console.log("Fetched tasks:", data.results); // Verifica los datos
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setErrors("Error fetching tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  // Maneja la creación de una nueva tarea
  const handleCreateTask = async (taskData) => {
    try {
      console.log("Creating task with data:", taskData);
      const { data } = await axios.post("api/tasks/", taskData);
      console.log("Created task:", data);
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (err) {
      if (err.response) {
        console.error("Server response data:", err.response.data);
        setErrors(err.response.data);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  // Maneja la actualización de una tarea
  const handleUpdateTask = async (id, updatedTask) => {
    try {
      console.log("Updating task with data:", updatedTask);
      const { data } = await axios.put(`api/tasks/${id}/`, updatedTask);
      console.log("Updated task:", data);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data : task))
      );
      setEditingTask(null);
    } catch (err) {
      console.error("Error updating task:", err);
      setErrors("Error updating task. Please try again.");
    }
  };

  // Maneja la eliminación de una tarea
  const handleDeleteTask = async (id) => {
    try {
      console.log("Deleting task with id:", id);
      await axios.delete(`api/tasks/${id}/`);
      console.log("Deleted task with id:", id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setErrors("Error deleting task. Please try again.");
    }
  };

  // Convert priority code to readable format
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "L":
        return "Low";
      case "M":
        return "Medium";
      case "H":
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <h1>Task Manager</h1>

      {/* Mostrar errores si los hay */}
      {errors && (
        <p className={`${styles.error} alert alert-danger`}>{errors}</p>
      )}

      {/* Formulario para crear tareas */}
      <TaskForm handleSubmit={handleCreateTask} />

      {/* Mostrar lista de tareas */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskBox}>
            {editingTask?.id === task.id ? (
              <TaskForm
                initialData={task}
                handleSubmit={(updatedTask) =>
                  handleUpdateTask(task.id, updatedTask)
                }
                onCancel={() => setEditingTask(null)}
              />
            ) : (
              <div>
                <div>
                  <strong>{task.title}</strong> - Priority:{" "}
                  {getPriorityLabel(task.priority)}
                </div>
                <div>Due Date: {task.due_date}</div>
                <div className={styles.taskActions}>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
