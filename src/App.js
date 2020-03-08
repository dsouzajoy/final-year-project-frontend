import React from "react";
import "./App.css";
import Login from "./components/Login";
import VoteView from "./components/VoteView";
import { BrowserRouter, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AuthorizedRoute from "./AuthorizedRoute";
import AdminDashboard from "./components/AdminDashboard";
import Analytics from "./components/Analytics";

const App = () => {
  const showLoader = useSelector(state => state.common.showLoader)

  return (
    <div className="App">
      {showLoader && <Loader />}
      <BrowserRouter>
        <Route path="/" component={AuthorizedRoute} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/vote" component={VoteView} />
        <Route exact path="/admin" component={AdminDashboard} />
        <Route exact path="/admin/analytics" component={Analytics} />
      </BrowserRouter>
    </div>
  );
};  


export default App;
