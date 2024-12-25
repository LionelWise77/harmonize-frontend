import React, { useEffect, useState } from "react";
import axios from "../api/axiosDefaults";
import styles from "../styles/Task.module.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get("tasks/");
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className={styles.tasksContainer}>
      <h1>Your Tasks</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={styles.taskBox}>
            <div>{task.date}</div>
            <div>{`${task.time} - ${task.title}`}</div>
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default Tasks;
