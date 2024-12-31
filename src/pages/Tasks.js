import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import TaskForm from "./TaskForm";
import styles from "../styles/Task.module.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch de tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("api/tasks/");
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setErrors("Error fetching tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData, resetForm) => {
    try {
      const { data } = await axios.post("api/tasks/", taskData);
      setTasks((prevTasks) => [...prevTasks, data]);
      setSuccessMessage("Task added! Well done!");
      resetForm(); //
      setTimeout(() => setSuccessMessage(""), 3000); // Elimina el mensaje después de 3 segundos
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors(err.response?.data || "An error occurred.");
    }
  };

  // Maneja la actualización de una tarea
  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const { data } = await axios.put(`api/tasks/${id}/`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data : task))
      );
      setEditingTask(null); // Salir del modo edición
    } catch (err) {
      console.error("Error updating task:", err);
      setErrors("Error updating task. Please try again.");
    }
  };

  // Maneja la eliminación de una tarea
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`api/tasks/${id}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setErrors("Error deleting task. Please try again.");
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <h1>Task Manager</h1>

      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}

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
                  <strong>{task.title}</strong> - Priority: {task.priority}
                </div>
                <div>Due Date: {task.due_date}</div>
                <div>Due Time: {task.due_time}</div>
                <div className={styles.taskActions}>
                  {/* Botón para editar */}
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                  {/* Botón para eliminar */}
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
