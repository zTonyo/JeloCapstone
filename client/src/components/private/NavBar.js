import React, { useEffect } from 'react';

const NavBar = () => {
  return (
    <div className='vertical light'>
      <nav className='topnav navBar navbar-light'>
        <button type='button' className='navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar'>
          <i className='fe fe-menu navbar-toggler-icon'></i>
        </button>
        <span className='avatar avatar-sm'>
          <div className='avatar-img rounded-circle avatar-initials-min text-center position-relative'></div>
        </span>
      </nav>
        <aside class="sidebar-left border-right bg-white" id="leftSidebar" data-simplebar></aside>
        <a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
          <i class="fe fe-x"><span class="sr-only"></span></i>
        </a>
    </div>
  );
}

export default NavBar;
