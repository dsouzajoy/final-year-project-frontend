import React, { useEffect } from "react";
import "./AdminDashboard.css";
import { useParams, Link } from "react-router-dom";
import PopUp from "../PopUp";

const AdminDashboard = props => {
  const {subroute} = useParams();
  useEffect(() => {console.log(subroute)});
  return (
    <div className="admin-dashboard">
        <PopUp>
          <div className="admin-options-container">
            <Link className="button admin-option" to="/vote">
              Begin Election process
            </Link>
            <Link className="button admin-option" to="/admin/analytics">
              Go To Analytics
            </Link>
          </div>
        </PopUp>
    </div>
  );
};

export default AdminDashboard;
