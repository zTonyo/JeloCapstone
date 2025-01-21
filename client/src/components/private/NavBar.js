import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { NavLink } from 'react-router-dom'; // Import NavLink to handle routing
import logo from '../../assets/logo.png';
import dashboard from './assets/iconDashboard.png';
import announcement from './assets/iconAnnouncement.png';
import guardianManagement from './assets/iconGuardianMngt.png';
import GAA from './assets/iconGAA.png';
import studentManagement from './assets/iconStudMngt.png'
import teacherManagement from './assets/iconTeacherMngt.png'

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
      <div
        className={`offcanvas offcanvas-start ${isOffcanvasVisible ? 'show' : 'hide'}`}
        tabIndex="-1"
        id="offcanvas-side"
        aria-labelledby="offcanvas-side"
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
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={dashboard} width="40" height="40" className="d-inline-block align-top" alt="dashboard"/>
              <NavLink to="/teacherdashboard" className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={studentManagement} width="40" height="40" className="d-inline-block align-top" alt="studentManagement"/>
              <NavLink to="/student-management" className="nav-link">Student Management</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={guardianManagement} width="40" height="40" className="d-inline-block align-top" alt="guardianManagement"/>
              <NavLink to="/guardian-management" className="nav-link">Guardian Management</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={teacherManagement} width="40" height="40" className="d-inline-block align-top" alt="teacherManagement"/>
              <NavLink to="/teacher-management" className="nav-link">Teacher Management</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={announcement} width="40" height="40" className="d-inline-block align-top" alt="announcement"/>
              <NavLink to="/announcement" className="nav-link">Announcement</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={GAA} width="40" height="40" className="d-inline-block align-top" alt="attendance"/>
              <NavLink to="/announcement" className="nav-link">Attendance</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={GAA} width="40" height="40" className="d-inline-block align-top" alt="grades"/>
              <NavLink to="/grades" className="nav-link">Grades</NavLink>
            </li>
            <li className="nav-item sideBar-item d-flex align-items-center">
              <img src={GAA} width="40" height="40" className="d-inline-block align-top" alt="AIrecord"/>
              <NavLink to="/ai-record" className="nav-link">AI Record</NavLink>
            </li>
          </ul>
        </div>


      </div>
    </div>
  );
};

export default NavBar;