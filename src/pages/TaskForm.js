import React, { useState } from "react";
import styles from "../styles/TaskForm.module.css";

const TaskForm = ({ initialData = {}, handleSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    due_date: initialData.due_date || "",
    start_time: initialData.start_time || "", // Reemplaza due_time con start_time
    end_time: initialData.end_time || "", // Agrega end_time
    priority: initialData.priority || "M",
    status: initialData.status || "open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetForm = () => {
    setFormData({
      title: "",
      description: "",
      due_date: "",
      start_time: "", // Resetea start_time
      end_time: "", // Resetea end_time
      priority: "M",
      status: "open",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData, handleResetForm);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.taskForm}>
      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className={styles.formControl}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.formControl}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label>Due Date</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Start Time</label>
          <input
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className={styles.formControl}
          />
        </div>
        <div className={styles.formGroup}>
          <label>End Time</label>
          <input
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={handleChange}
            className={styles.formControl}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className={styles.formControl}
          >
            <option value="L">Low</option>
            <option value="M">Medium</option>
            <option value="H">High</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={styles.formControl}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={styles.btnModern}>
          Add Task
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={styles.btnSecondary}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
