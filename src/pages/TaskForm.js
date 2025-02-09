import React, { useState, useEffect } from "react";
import axios from "../api/axiosDefaults";
import styles from "../styles/TaskForm.module.css";

const TaskForm = ({ initialData = {}, handleSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    due_date: initialData?.due_date || "",
    start_time: initialData?.start_time || "",
    end_time: initialData?.end_time || "",
    priority: initialData?.priority || "M",
    status: initialData?.status || "open",
  });

  useEffect(() => {
    setFormData({
      title: initialData?.title || "",
      description: initialData?.description || "",
      due_date: initialData?.due_date || "",
      start_time: initialData?.start_time || "",
      end_time: initialData?.end_time || "",
      priority: initialData?.priority || "M",
      status: initialData?.status || "open",
    });
  }, [initialData]);

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
      start_time: "",
      end_time: "",
      priority: "M",
      status: "open",
    });
  };

  const validateDueDate = (dueDate) => {
    const currentDate = new Date();
    if (new Date(dueDate) < currentDate) {
      alert("Date cannot be before the current date.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const dueDate = formData.due_date;
    if (!validateDueDate(dueDate)) {
      return;
    }
    // Proceed with form submission
    try {
      const response = await axios.post("/api/tasks/", formData);
      const data = response.data;
      if (data.due_date) {
        alert(data.due_date[0]);
      } else {
        handleSubmit(data, handleResetForm);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          {initialData?.id ? "Update Task" : "Add Task"}
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
