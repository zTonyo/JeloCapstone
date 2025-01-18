import React, { useState } from 'react';
import logo from '../../assets/logo.png';

const NavBar = ({ onLogout }) => {
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);

  const toggleOffcanvas = () => {
    setOffcanvasVisible(!isOffcanvasVisible);
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
        
        <button onClick={onLogout}>
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
          {/* <button type="button" className="btn-close text-reset" onClick={toggleOffcanvas} aria-label="Close"></button> */}
        </div>
        <div className="offcanvas-body">
          <p>Some content for the sidebar.</p>
          <p>More content here.</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
