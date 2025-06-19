import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import logo from "../assets/images/logo-tridente2.png"; // Ajusta el path según tu estructura

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/", {}, { withCredentials: true });

      setCurrentUser(null);

      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      console.log("Sign out successful!");
    } catch (error) {
      console.error(
        "Error signing out:",
        error.response?.data || error.message
      );
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks"
        aria-label="Go to Tasks"
      >
        <i className="fas fa-tasks" aria-hidden="true"></i>Tasks
      </NavLink>

      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
        aria-label="Sign out"
      >
        <i className="fas fa-sign-out-alt" aria-hidden="true"></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}
        aria-label="Go to Profile"
      ></NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
        aria-label="Sign in"
      >
        <i className="fas fa-sign-in-alt" aria-hidden="true"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
        aria-label="Sign up"
      >
        <i className="fas fa-user-plus" aria-hidden="true"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/" className={styles.NavLogo} aria-label="Go to Home">
          <img src={logo} alt="Harmonize Logo" className={styles.LogoImage} />
        </NavLink>
        {currentUser && (
          <span className={styles.userName} aria-live="polite">
            Hi, {currentUser.username}!
          </span>
        )}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          aria-label="Toggle navigation"
        />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
              aria-label="Go to Home"
            >
              <i className="fas fa-home" aria-hidden="true"></i>Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
