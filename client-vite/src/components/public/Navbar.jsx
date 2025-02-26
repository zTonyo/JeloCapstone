import React from 'react';
import { NavLink } from 'react-router-dom';
// import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
            <NavLink className="nav-link" to="/" activeclassname="active">HOME</NavLink>
          </li>
          <li className="nav-item p-2">
            <NavLink className="nav-link" to="/about" activeclassname="active">ABOUT</NavLink>
          </li>
          <li className="nav-item p-2">
            <NavLink className="nav-link" to="/teacherlogin" activeclassname="active">TEACHERS</NavLink>
          </li>
          <li className="nav-item p-2">
            <NavLink className="nav-link" to="/guardianlogin" activeclassname="active">GUARDIAN</NavLink>
          </li>
          <li className="nav-item p-2 btn-enroll-now">
            {/* <NavLink className="nav-link" style={{padding: '2px'}} activeclassname="active" onClick={handleEnrollNowClick}>ENROLL NOW</NavLink> */}
            <NavLink className="nav-link" to="/enroll" style={{padding: '2px'}} activeclassname="active">ENROLL NOW</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;