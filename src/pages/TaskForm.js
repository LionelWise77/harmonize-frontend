import React, { useState } from "react";
import styles from "../styles/TaskForm.module.css";

const TaskForm = ({ initialData, handleSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dueDate, setDueDate] = useState(initialData?.due_date || "");
  const [priority, setPriority] = useState(initialData?.priority || "Low");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ title, due_date: dueDate, priority });
  };

  return (
    <form onSubmit={onSubmit} className={styles.taskForm}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
