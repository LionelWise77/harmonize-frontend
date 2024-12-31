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
  const [expandedTaskId, setExpandedTaskId] = useState(null);

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
      setSuccessMessage("Task added successfully!");
      resetForm();
      setShowForm(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors(err.response?.data || "An error occurred.");
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const { data } = await axios.put(`api/tasks/${id}/`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? data : task))
      );
      setEditingTask(null);
      setSuccessMessage("Task updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating task:", err);
      setErrors("Error updating task. Please try again.");
    }
  };

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
                <div className={styles.taskRow}>
                  <div className={styles.left}>
                    <p>
                      <strong>Due Date:</strong>{" "}
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "Not set"}
                    </p>
                  </div>
                  <div className={styles.right}>
                    <p>
                      <strong>Priority:</strong>{" "}
                      {task.priority === "H"
                        ? "High"
                        : task.priority === "M"
                        ? "Medium"
                        : "Low"}
                    </p>
                  </div>
                </div>
                <div className={styles.taskRow}>
                  <div className={styles.left}>
                    <p>
                      <strong>Start Time:</strong>{" "}
                      {task.start_time
                        ? new Date(
                            `1970-01-01T${task.start_time}`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Not set"}
                    </p>
                  </div>
                  <div className={styles.right}>
                    <p>
                      <strong>End Time:</strong>{" "}
                      {task.end_time
                        ? new Date(
                            `1970-01-01T${task.end_time}`
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Not set"}
                    </p>
                  </div>
                </div>
                <div className={styles.center}>
                  <button
                    className={styles.toggleDescription}
                    onClick={() =>
                      setExpandedTaskId(
                        expandedTaskId === task.id ? null : task.id
                      )
                    }
                  >
                    {expandedTaskId === task.id
                      ? "Hide Description"
                      : "Show Description"}
                  </button>
                  {expandedTaskId === task.id && (
                    <p className={styles.taskDescription}>
                      {task.description || "No description provided"}
                    </p>
                  )}
                </div>
                <div className={styles.taskActions}>
                  <button
                    className={styles.btnEdit}
                    onClick={() => setEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.btnDelete}
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
