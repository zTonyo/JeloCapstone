import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

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
    <div className='wrapper'>
      <nav className={`navBar navbar-light ${isOffcanvasVisible ? 'navbar-with-sidebarOpen' : 'navbar-with-sidebarClose'}`}>
        <div className='navBar-button-text d-flex'>
          <button type="button" className="navbar-toggler" onClick={toggleOffcanvas}>
            <i className="fe fe-menu"></i>
          </button>
           <span className='navBar-text'>Child Development Center Management System</span>
        </div>
        
        <button className="btn-none" onClick={handleLogClick}>
          <span className="avatar">
            <div className="avatar-img avatar-initials-min"></div>
          </span>
        </button>
      </nav>

      {/* Offcanvas Sidebar */}
      <div className={`offcanvas offcanvas-start ${isOffcanvasVisible ? 'show' : 'hide'}`}
           tabIndex="-1"
           id="offcanvas-side"
           aria-labelledby="offcanvas-side">
        <a href='#' className={`sidebar-toggler ${isOffcanvasVisible ? 'toggle-show' : ''}`} onClick={toggleOffcanvas}>
          <i className='fe fe-x'></i>
        </a>
        <div className="offcanvas-header d-flex">
          <div className="offcanvas-title" id="offcanvasExampleLabel">
            <img src={logo} width="45" className="d-inline-block logo-style" alt="logo"/>
            <div>
              <br/>
              <span>CDCMS</span>
            </div>
          </div>
        </div>
        <ul className="nav flex-column sideBar-nav">
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faChartLine} />
            <NavLink to="#" className="nav-link">Admin Dashboard</NavLink>
          </li>
        </ul>
        {/* Sidebar menu with NavLinks */}
        <div className="offcanvas-body">
          <ul className="nav flex-column sideBar-nav">
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={dashboard} width="40" height="40" className="d-inline-block align-top" alt="dashboard"/> */}
              <NavLink to="/teacherdashboard" className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={studentManagement} width="40" height="40" className="d-inline-block align-top" alt="studentManagement"/> */}
              <NavLink to="/student-management" className="nav-link">Student Management</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={guardianManagement} width="40" height="40" className="d-inline-block align-top" alt="guardianManagement"/> */}
              <NavLink to="/guardian-management" className="nav-link">Guardian Management</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={teacherManagement} width="40" height="40" className="d-inline-block align-top" alt="teacherManagement"/> */}
              <NavLink to="/teacher-management" className="nav-link">Teacher Management</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={announcement} width="40" height="40" className="d-inline-block align-top" alt="announcement"/> */}
              <NavLink to="/announcement" className="nav-link">Announcement</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={GAA} width="40" height="40" className="d-inline-block align-top" alt="attendance"/> */}
              <NavLink to="/announcement" className="nav-link">Attendance</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={GAA} width="40" height="40" className="d-inline-block align-top" alt="grades"/> */}
              <NavLink to="/grades" className="nav-link">Grades</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              {/* <img src={GAA} width="40" height="40" className="d-inline-block align-top" alt="AIrecord"/> */}
              <NavLink to="/ai-record" className="nav-link">AI Record</NavLink>
            </li>
          </ul>
        </div>


      </div>
    </div>
  );
};

export default NavBar;