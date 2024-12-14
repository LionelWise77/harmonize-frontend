import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Tasks from "./pages/Tasks";
import Home from "./pages/Home";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("access_token"));

  return (
    <Router>
      <Header auth={auth} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          {!auth ? <Login setAuth={setAuth} /> : <Redirect to="/" />}
        </Route>
        <Route path="/logout">
          {auth ? <Logout setAuth={setAuth} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/tasks">
          {auth ? <Tasks /> : <Redirect to="/login" />}
        </Route>
        <Route path="/register">
          {auth ? <Tasks /> : <Redirect to="/register" />}
        </Route>
        <Route path="/create-task">
          {auth ? <Tasks /> : <Redirect to="/CreateTasks" />}
        </Route>

        <Route>
          <h1>404 - Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
