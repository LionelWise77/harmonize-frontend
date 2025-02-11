import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-md-left text-center">
            <p className={styles.Copy}>
              &copy; {new Date().getFullYear()} Sebastian P
            </p>
          </Col>
          <Col md={4} className="text-center">
            <NavLink to="/" className={styles.FooterLogo}>
              Harmonize
            </NavLink>
          </Col>
          <Col md={4} className="text-md-right text-center">
            <div className={styles.SocialIcons}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
