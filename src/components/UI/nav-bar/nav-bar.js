import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./nav-bar.css";
const NavBarComponent = (props) => {
  let { logout } = props;
  logout = () => {
    props.logoutApp();
  };
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right">
          <li onClick={logout}>
            <a>
              <span className="glyphicon glyphicon-log-out"></span> Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default withRouter(NavBarComponent);
