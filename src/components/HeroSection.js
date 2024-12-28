import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Lista de frases motivadoras y conscientes
    const quotes = [
      "Harmony begins with a single step towards clarity.",
      "Small consistent actions lead to big transformations.",
      "Breathe, focus, and align your energy with your goals.",
      "Your journey is unique—embrace every moment.",
      "Stay organized, stay balanced, stay harmonized.",
      "Progress, not perfection, is the goal.",
      "Every day is an opportunity to realign and thrive.",
    ];
    // Selecciona una frase aleatoria
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Harmonize Daily Planner</h1>
        <p className={styles.heroSubtitle}>{quote}</p>
        <div className={styles.heroButtons}>
          <Link to="/tasks" className={styles.heroButton}>
            View Tasks
          </Link>
          <Link to="/tasks/create" className={styles.heroButton}>
            Create Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
