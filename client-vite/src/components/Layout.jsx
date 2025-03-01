import React from "react";
import Navbar from "./public/Navbar";
import NavBar from "./private/NavBar";
import NavBarGuardian from "./private/NavBarGuardian";

const Layout = ({ isLoggedIn, isLoggedInGuardian, sidebarOpen, setSidebarOpen, children }) => {
  let navbarComponent;
  if (isLoggedIn) {
    navbarComponent = <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
  } else if (isLoggedInGuardian) {
    navbarComponent = <NavBarGuardian sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
  } else {
    navbarComponent = <Navbar />;
  }

  return (
    <>
      {navbarComponent}
      {children}
    </>
  );
};

export default Layout;