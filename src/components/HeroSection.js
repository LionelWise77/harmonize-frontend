import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HeroSection.module.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const HeroSection = () => {
  const [quote, setQuote] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    // Lista de frases filosóficas y motivadoras
    const quotes = [
      "Happiness depends upon ourselves. - Aristotle",
      "The unexamined life is not worth living. - Socrates",
      "He who has overcome his fears will truly be free. - Aristotle",
      "Knowing yourself is the beginning of all wisdom. - Aristotle",
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle",
      "Man is the measure of all things. - Protagoras",
      "Poverty is the parent of revolution and crime. - Aristotle",
      "Do not spoil what you have by desiring what you have not. - Epicurus",
    ];
    // Selecciona una frase aleatoria
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className={`${styles.heroContainer} ${styles.HerogreekBackground}`}>
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
