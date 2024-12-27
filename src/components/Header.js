import React from "react"; // Importar React
import { Navbar, Container, Nav } from "react-bootstrap"; // Bootstrap Navbar
import { NavLink, useHistory } from "react-router-dom"; // Navegación y historial
import axios from "axios"; // Axios para las peticiones
import styles from "../styles/Header.module.css"; // Estilos
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

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
      localStorage.removeItem("access_token");
      setCurrentUser(null);
      history.push("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
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

  const guestIcons = (
    <>
      <NavLink to="/signup" className={styles.NavLink}>
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
      <NavLink to="/signin" className={styles.NavLink}>
        <i className="fas fa-sign-in-alt"></i> Sign In
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
            {currentUser ? loggedInIcons : guestIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
