import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge, faGraduationCap, faPeopleRoof, faPersonChalkboard, faBullhorn, faClipboardUser, faNewspaper, faRobot } from '@fortawesome/free-solid-svg-icons';

const NavBarGuardian = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const toggleOffcanvas = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogClick = () => {
    localStorage.setItem("isLoggedInGuardian", "false");
    navigate('/');
    window.location.reload();
  };

  return (
    <div className='wrapper'>
      <nav className={`navBar fixed-top navbar-light ${sidebarOpen ? 'navbar-with-sidebarClose' : 'navbar-with-sidebarOpen'}`}>
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
      <div className={`offcanvas offcanvas-start ${sidebarOpen ? 'hide' : 'show'}`}
           tabIndex="-1"
           id="offcanvas-side"
           aria-labelledby="offcanvas-side">
        <button className={`sidebar-toggler ${sidebarOpen ? '' : 'toggle-show'}`} onClick={toggleOffcanvas}>
          <i className='fe fe-x'></i>
        </button>
        <div className="offcanvas-header d-flex">
          <div className="offcanvas-title" id="offcanvasExampleLabel">
            <img src={logo} width="45" className="d-inline-block logo-style" alt="logo"/>
            <div className='NavBar-title'>
              <span>CDCMS PORTAL</span>
            </div>
          </div>
        </div >

        {/* Sidebar menu with NavLinks */}
        <ul className="nav flex-column sideBar-nav">
          <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/guardiandashboard' ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faGauge} />
            <NavLink to="/guardiandashboard" className="nav-link side-link">Dashboard</NavLink>
          </li>
        </ul>
        
        <span className='div-sideBar-name'>MAIN COMPONENTS</span>

        <ul className="nav flex-column sideBar-nav">
          <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/guardian-announcement' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faBullhorn} />
            <NavLink to="/guardian-announcement" className="nav-link side-link">Announcement</NavLink>
          </li>
          <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/guardian-teachers-profile' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faPersonChalkboard} />
            <NavLink to="/guardian-teachers-profile" className="nav-link side-link">Teacher's Profile</NavLink>
          </li>
          {/* <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/teacher-management' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faPersonChalkboard} />
            <NavLink to="/teacher-management" className="nav-link side-link">Teacher Management</NavLink>
          </li> */}
          {/* <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/announcement' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faBullhorn} />
            <NavLink to="/announcement" className="nav-link side-link">Announcement</NavLink>
          </li> */}
          {/* <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/attendance' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faClipboardUser} />
            <NavLink to="/attendance" className="nav-link side-link">Attendance</NavLink>
          </li> */}
          {/* <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/grade' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faNewspaper} />
            <NavLink to="/grades" className="nav-link side-link">Grades</NavLink>
          </li> */}
          {/* <li className={`nav-item sideBar-item d-flex align-items-center ${window.location.pathname === '/ai-record' ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faRobot} />
            <NavLink to="/ai-record" className="nav-link side-link">AI Record</NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default NavBarGuardian;