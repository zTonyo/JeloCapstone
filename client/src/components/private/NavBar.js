import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { NavLink } from 'react-router-dom'; // Import NavLink to handle routing
import logo from '../../assets/logo.png';

const NavBar = () => {
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleOffcanvas = () => {
    setOffcanvasVisible(!isOffcanvasVisible);
  };
  
  const handleLogClick = () => {
    localStorage.setItem("isLoggedIn", "false");
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <nav className={`navBar navbar-light ${isOffcanvasVisible ? 'navbar-with-sidebar' : ''}`}>
        <div className='navBar-button-text d-flex'>
          <button type="button" className="navbar-toggler" onClick={toggleOffcanvas}>
            <i className="navbar-toggler-icon"></i>
          </button>
           <span className='navBar-text'>Child Development Center Management System</span>
        </div>
        
        <button onClick={handleLogClick}>
          <span className="avatar">
            <div className="avatar-img avatar-initials-min"></div>
          </span>
        </button>
      </nav>

      {/* Offcanvas Sidebar */}
      <div
        className={`offcanvas offcanvas-start ${isOffcanvasVisible ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <div className='p-2'>
            <img src={logo} width="100" height="100" className="d-inline-block align-top" alt="logo"/>
          </div>
          <div className="offcanvas-title p-2" id="offcanvasExampleLabel">
              CDCMS
          </div>
        </div>
        
        {/* Sidebar menu with NavLinks */}
        <div className="offcanvas-body">
          <ul className="nav flex-column sideBar-nav">
            <li className="nav-item sideBar-item">
              <NavLink to="/teacherdashboard" className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item sideBar-item">
              <NavLink to="/student-management" className="nav-link">Student Management</NavLink>
            </li>
            <li className="nav-item sideBar-item">
              <NavLink to="/guardian-management" className="nav-link">Guardian Management</NavLink>
            </li>
            <li className="nav-item sideBar-item">
              <NavLink to="/teacher-management" className="nav-link">Teacher Management</NavLink>
            </li>
            <li className="nav-item sideBar-item">
              <NavLink to="/announcement" className="nav-link">Announcement</NavLink>
            </li>
            <li className="nav-item sideBar-item">
              <NavLink to="/grades" className="nav-link">Grades</NavLink>
            </li>
            <li className="nav-item sideBar-item">
              <NavLink to="/ai-record" className="nav-link">AI Record</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;