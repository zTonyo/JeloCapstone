import React, { useState } from 'react';

const NavBar = () => {
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
  
  const toggleOffcanvas = () => {
    setOffcanvasVisible(!isOffcanvasVisible);
  };

  return (
    <div>
      <nav className="navBar navbar-light">
        <button type="button" className="navbar-toggler" onClick={toggleOffcanvas}>
          <i className="navbar-toggler-icon"></i>
        </button>
        <span className="avatar">
          <div className="avatar-img avatar-initials-min"></div>
        </span>
      </nav>

      {/* Offcanvas Sidebar */}
      <div className={`offcanvas offcanvas-start ${isOffcanvasVisible ? 'show' : ''}`} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Sidebar</h5>
          <button type="button" className="btn-close text-reset" onClick={toggleOffcanvas} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <p>Some content for the sidebar.</p>
          <p>More content here.</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
