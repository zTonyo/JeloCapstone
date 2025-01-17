import React, { useEffect } from 'react';

const NavBar = () => {
  return (
    <div className=''>
      <nav className='navBar navbar-light'>
        <button type='button' className='navbar-toggler'>
          <i className='navbar-toggler-icon'></i>
        </button>
        <span className='avatar'>
          <div className='avatar-img avatar-initials-min'></div>
        </span>
      </nav>
    </div>
  );
}

export default NavBar;
