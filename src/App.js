import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("access_token"));

  return (
    <Router>
      <Header auth={auth} />
      <Switch>
        <Route exact path="/">
          <h1>Welcome to Harmonize Calendar</h1>
        </Route>
        <Route path="/login">
          <Login setAuth={setAuth} />
        </Route>
        <Route path="/logout">
          <Logout setAuth={setAuth} />
        </Route>
        <Route path="/register">
          {" "}
          {/* Agrega esta ruta */}
          <Register />
        </Route>
        {auth && (
          <Route path="/tasks">
            <Tasks />
          </Route>
        )}
        <Route>
          <h1>404 - Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
