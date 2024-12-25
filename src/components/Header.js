import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const Header = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post(
        "/dj-rest-auth/logout/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setCurrentUser(null);
      localStorage.removeItem("access_token");
      console.log("Logout successful");
      history.push("/signin");
    } catch (err) {
      console.error("Logout failed:", err.response || err.message);
    }
  };

  const loggedInIcons = (
    <>
      <span className={styles.NavLink}>
        <i className="fas fa-user"></i> {currentUser?.username}
      </span>
      <NavLink to="/" className={styles.NavLink} onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <Navbar.Brand className={styles.AppName}>
          Harmonize Daily Planner
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink className={styles.NavLink} exact to="/">
              Home
            </NavLink>
            {currentUser ? loggedInIcons : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
