import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
      <NavLink className="navbar-brand" to="/">
        <div className='d-flex'>
          <img src={logo} width="50" height="50" className="d-inline-block align-top" alt="logo"/>
          <p className='cdcms-logo'>CDCMS</p>
        </div>
      </NavLink>
      <div className="justify-content-end" id="navbarNav">
        <ul className="navbar-nav flex-row">
          <li className="nav-item p-2">
            <NavLink className="nav-link" to="/" activeClassName="active">HOME</NavLink>
          </li>
          <li className="nav-item p-2">
            <NavLink className="nav-link" to="../../about" activeClassName="active">ABOUT</NavLink>
          </li>
          <li className="nav-item p-2">
            <NavLink className="nav-link" to="../../teacherlogin" activeClassName="active">TEACHERS</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;