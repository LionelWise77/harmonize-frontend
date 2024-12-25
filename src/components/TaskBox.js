import React from "react";
import styles from "../styles/TaskBox.module.css";

function TaskBox({ date, time, title }) {
  return (
    <div className={styles.taskBox}>
      <div className={styles.taskDate}>Date: {date}</div>
      <div className={styles.taskDetails}>
        <span>{time}</span>
        <span>{title}</span>
      </div>
    </div>
  );
}

export default TaskBox;
