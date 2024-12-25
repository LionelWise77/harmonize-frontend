import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="socialLinks">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </div>
      <p>&copy; 2024 Harmonize Daily Planner</p>
    </footer>
  );
}

export default Footer;
