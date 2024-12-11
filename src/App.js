import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Switch>
    </Router>
  );
}

export default App;
