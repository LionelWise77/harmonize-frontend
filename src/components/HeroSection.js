import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSection.module.css";
import axios from "axios";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const HeroSection = () => {
  const [quote, setQuote] = useState("");
  const [tasks, setTasks] = useState([]);
  const currentUser = useCurrentUser();

  // Lógica para quotes aleatorios
  useEffect(() => {
    const quotes = [
      "Breathe, focus, and accomplish one task at a time.",
      "Small steps each day lead to big success.",
      "Harmony is the key to productivity.",
      "Stay calm, stay organized, stay Harmonized.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // Lógica para obtener las tareas del usuario
  useEffect(() => {
    if (currentUser) {
      const fetchTasks = async () => {
        try {
          const { data } = await axios.get("tasks/"); // Ajusta la ruta según tu backend
          setTasks(data);
        } catch (err) {
          console.error("Error fetching tasks:", err);
        }
      };

      fetchTasks();
    }
  }, [currentUser]);

  return (
    <div className={styles.heroContainer}>
      {/* Sección Izquierda */}
      <div className={styles.heroLeft}>
        <h1 className={styles.heroTitle}>Harmonize Daily Planner</h1>
        <p className={styles.heroQuote}>{quote}</p>
        {!currentUser && (
          <div className={styles.heroButtons}>
            <Link to="/signup" className={styles.heroButton}>
              Sign Up
            </Link>
            <Link to="/signin" className={styles.heroButton}>
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Sección Derecha */}
      <div className={styles.heroRight}>
        <h2 className={styles.heroSubtitle}>
          {currentUser ? "Así se ve tu día" : "Tareas del ejemplo"}
        </h2>
        <div className={styles.taskList}>
          {currentUser && tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className={styles.taskBox}>
                <div>{task.date}</div>
                <div>{`${task.time} - ${task.title}`}</div>
              </div>
            ))
          ) : (
            <>
              <div className={styles.taskBox}>
                <div>Date: 2024-12-16</div>
                <div>10:00 AM - Morning Meditation</div>
              </div>
              <div className={styles.taskBox}>
                <div>Date: 2024-12-16</div>
                <div>2:00 PM - Work on Project Harmonize</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
