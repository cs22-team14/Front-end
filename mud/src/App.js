import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <h1>Hey!</h1>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
