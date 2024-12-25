import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Context
import { CurrentUserProvider } from "./contexts/CurrentUserContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

// Páginas
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Logout from "./pages/Logout";

// Estilos
import styles from "./App.module.css";

function App() {
  return (
    <CurrentUserProvider>
      <Router>
        <div className={styles.App}>
          {/* Header */}
          <Header />

          {/* Contenido Principal */}
          <Switch>
            {/* Página Principal */}
            <Route exact path="/" component={HeroSection} />

            {/* Autenticación */}
            <Route path="/signup" component={SignUpForm} />
            <Route path="/signin" component={SignInForm} />
            <Route path="/logout" component={Logout} />

            {/* Funcionalidad Principal */}
            <Route path="/tasks" component={Tasks} />
            <Route path="/calendar" component={Calendar} />

            {/* 404 */}
            <Route render={() => <h1>404 - Page Not Found</h1>} />
          </Switch>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </CurrentUserProvider>
  );
}

export default App;
