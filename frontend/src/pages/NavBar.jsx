import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <NavLink exact to="/exporter-dashboard" activeClassName="active">
        Dashboard
      </NavLink>
      <NavLink to="/exporter-shipnow" activeClassName="active">
        Ship now
      </NavLink>
    </>
  );
};



export default NavBar;
