import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faGraduationCap, faPeopleRoof, faPersonChalkboard, faBullhorn, faClipboardUser, faNewspaper, faRobot } from '@fortawesome/free-solid-svg-icons';

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
              <span>PORTAL</span>
            </div>
          </div>
        </div >

        {/* Sidebar menu with NavLinks */}
        <ul className="nav flex-column sideBar-nav">
          <li className="nav-item sideBar-item d-flex align-items-center">
          <FontAwesomeIcon icon={faGaugeHigh} />
            <NavLink to="/teacherdashboard" className="nav-link">Dashboard</NavLink>
          </li>
        </ul>
        
        <span className='div-sideBar-name'>MAIN COMPONENTS</span>

        <ul className="nav flex-column sideBar-nav">
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faGraduationCap} />
            <NavLink to="/student-management" className="nav-link">Student Management</NavLink>
          </li>
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faPeopleRoof} />
            <NavLink to="/guardian-management" className="nav-link">Guardian Management</NavLink>
          </li>
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faPersonChalkboard} />
            <NavLink to="/teacher-management" className="nav-link">Teacher Management</NavLink>
          </li>
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faBullhorn} />
            <NavLink to="/announcement" className="nav-link">Announcement</NavLink>
          </li>
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faClipboardUser} />
            <NavLink to="/announcement" className="nav-link">Attendance</NavLink>
          </li>
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faNewspaper} />
            <NavLink to="/grades" className="nav-link">Grades</NavLink>
          </li>
          <li className="nav-item sideBar-item d-flex align-items-center">
            <FontAwesomeIcon icon={faRobot} />
            <NavLink to="/ai-record" className="nav-link">AI Record</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;