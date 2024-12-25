import React, { useState } from "react";
import axios from "../api/axiosDefaults";
import styles from "../styles/TaskBox.module.css";

const CreateTask = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "M", // Medium by default
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/tasks/", formData);
      onTaskCreated(data); // Notifica al componente padre que se creó una tarea
      setFormData({
        title: "",
        description: "",
        due_date: "",
        priority: "M",
      }); // Resetea el formulario
    } catch (err) {
      setErrors(err.response?.data || "An error occurred.");
    }
  };

  return (
    <div className={styles.CreateTask}>
      <h2>Create a New Task</h2>
      {errors && <p className={styles.Errors}>{JSON.stringify(errors)}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="L">Low</option>
          <option value="M">Medium</option>
          <option value="H">High</option>
        </select>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;
