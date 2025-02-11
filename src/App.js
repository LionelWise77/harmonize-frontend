import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

// Context
import {
  CurrentUserProvider,
  useCurrentUser,
} from "./contexts/CurrentUserContext";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import CalendarView from "./components/Calendar.View";
import Footer from "./components/Footer";

// Páginas
import SignInForm from "./pages/auth/SignInForm";
import SignUpForm from "./pages/auth/SignUpForm";
import Tasks from "./pages/Tasks";

// Estilos
import styles from "./App.module.css";

// Componente de Ruta Protegida
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const currentUser = useCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

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
            <Route path="/signin" component={SignInForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/" component={CalendarView} />

            {/* Funcionalidad Principal (Rutas Protegidas) */}
            <ProtectedRoute path="/tasks" component={Tasks} />

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
