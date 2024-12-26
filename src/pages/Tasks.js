import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import styles from "../styles/Task.module.css";
import CreateTask from "../components/CreateTask";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("tasks/");
        console.log("Tasks fetched:", data.results);
        setTasks(data.results);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setErrors("Error fetching tasks. Please try again.");
      }
    };

    fetchTasks();
  }, []);
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className={styles.tasksContainer}>
      <h1>Your Tasks</h1>

      {}
      {errors && (
        <p className={`${styles.error} alert alert-danger`}>{errors}</p>
      )}

      {/* Componente para crear tareas */}
      <CreateTask onTaskCreated={handleTaskCreated} />

      {/* Mostrar lista de tareas */}
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskBox}>
            <div>{task.due_date}</div>
            <div>{`${task.title} - Priority: ${task.priority}`}</div>
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
