import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSection.module.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const HeroSection = () => {
  const [quote, setQuote] = useState("");
  const currentUser = useContext(CurrentUserContext);

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
          {currentUser ? (
            <Link to="/tasks" className={styles.heroButton}>
              Task Manager
            </Link>
          ) : (
            <Link to="/signin" className={styles.heroButton}>
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
