import React from "react";
import "./App.css";
import Login from "./components/Login";
import VoteView from "./components/VoteView";
import { BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/vote" component={VoteView} />
      </BrowserRouter>
    </div>
  );
};

export default App;
