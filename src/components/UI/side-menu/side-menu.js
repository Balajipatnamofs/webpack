import React, { Component, Fragment } from 'react';
import './side-menu.css';
import { MENUS } from '../../../components/constants/menus.js';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const sideMenu = () => {
  const menus = MENUS;
  return (<section className="side-menu-head">
    <div className="side-menu">
      <div className="header">Event - Management</div>
      <ul className="nav nav-pills nav-stacked">
        {menus.map(val => {
          return (<li key={val.name}><NavLink to={val.url}>{val.name}</NavLink></li>);
        })}</ul>
    </div>
    <div className="bg-img">
    </div>
  </section>);
}
export default sideMenu