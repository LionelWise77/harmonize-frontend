import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import styles from "../styles/Task.module.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    due_date: "",
    priority: "Low",
  });
  const [errors, setErrors] = useState(null);

  // Fetch de tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("tasks/");
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setErrors("Error fetching tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);

  // Maneja la creación de una nueva tarea
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("tasks/", newTask);
      setTasks((prevTasks) => [...prevTasks, data]);
      setNewTask({ title: "", due_date: "", priority: "Low" });
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors("Error creating task. Please try again.");
    }
  };

  // Maneja la actualización de una tarea
  const handleTaskUpdated = async (id, updatedTask) => {
    try {
      const { data } = await axios.put(`tasks/${id}/`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setErrors("Error updating task. Please try again.");
    }
  };

  // Maneja la eliminación de una tarea
  const handleTaskDeleted = async (id) => {
    try {
      await axios.delete(`tasks/${id}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setErrors("Error deleting task. Please try again.");
    }
  };

  return (
    <div className={styles.tasksContainer}>
      <h1>Your Tasks</h1>

      {/* Mostrar errores si los hay */}
      {errors && (
        <p className={`${styles.error} alert alert-danger`}>{errors}</p>
      )}

      {/* Formulario para crear tareas */}
      <form onSubmit={handleCreateTask} className={styles.taskForm}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={newTask.due_date}
          onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
          required
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>

      {/* Mostrar lista de tareas */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskBox}>
            <div>
              <strong>{task.title}</strong> - Priority: {task.priority}
            </div>
            <div>Due Date: {task.due_date}</div>
            <div className={styles.taskActions}>
              {/* Botón para editar */}
              <button
                className="btn btn-warning btn-sm"
                onClick={() =>
                  handleTaskUpdated(task.id, {
                    ...task,
                    title: `${task.title} (Updated)`,
                  })
                }
              >
                Edit
              </button>
              {/* Botón para eliminar */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleTaskDeleted(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
