import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import TaskForm from "./TaskForm";
import styles from "../styles/Task.module.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [errors, setErrors] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Función para obtener las tareas
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("api/tasks/");
      setTasks(data.results);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setErrors("Error fetching tasks. Please try again.");
    }
  };

  // Llamar a fetchTasks cuando se monta el componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Crear una nueva tarea
  const handleCreateTask = async (taskData, resetForm) => {
    try {
      const { data } = await axios.post("api/tasks/", taskData);
      setTasks((prevTasks) => [...prevTasks, data]);
      setSuccessMessage("Task added successfully!");
      resetForm();
      setShowForm(false); // Cerrar el modal
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors(err.response?.data || "An error occurred.");
    }
  };

  // Editar una tarea existente
  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const { data } = await axios.put(`api/tasks/${id}/`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data : task))
      );
      setEditingTask(null); // Cerrar el modal de edición
      setSuccessMessage("Task updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating task:", err);
      setErrors("Error updating task. Please try again.");
    }
  };

  // Eliminar una tarea
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`api/tasks/${id}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      setSuccessMessage("Task deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting task:", err);
      setErrors("Error deleting task. Please try again.");
    }
  };

  // Cambiar el estado de una tarea (completada o no)
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const updatedStatus =
        currentStatus === "completed" ? "open" : "completed";
      const { data } = await axios.patch(`api/tasks/${id}/`, {
        status: updatedStatus,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data : task))
      );
      setSuccessMessage("Task status updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating task status:", err);
      setErrors("Error updating task status. Please try again.");
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <h1>Task Manager</h1>
      <p className={styles.subHeader}>Welcome</p>

      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      {errors && (
        <p className={`${styles.error} alert alert-danger`}>{errors}</p>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className={styles.createTaskButton}
      >
        {showForm ? "Hide Form" : "Create Task"}
      </button>

      {showForm && (
        <TaskForm
          handleSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskBox} ${
              task.status === "completed" ? styles.taskCompleted : ""
            }`}
          >
            {editingTask?.id === task.id ? (
              <TaskForm
                initialData={task}
                handleSubmit={(updatedTask) =>
                  handleUpdateTask(task.id, updatedTask)
                }
                onCancel={() => setEditingTask(null)}
              />
            ) : (
              <div className={styles.taskContent}>
                <h2 className={styles.taskTitle}>{task.title}</h2>
                <p className={styles.taskDate}>Due: {task.due_date}</p>
                <div className={styles.taskActions}>
                  <button
                    onClick={() => setEditingTask(task)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleToggleComplete(task.id, task.status)}
                    className={styles.toggleButton}
                  >
                    {task.status === "completed" ? "Reopen" : "Complete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Tasks;
