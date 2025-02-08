import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Attendance({ sidebarOpen }) {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
      navigate('/');
    };
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
        <h2>Attendance</h2>
        <p>Welcome to your Attendance</p>
      </div>
    </div>
  );
}

export default Attendance;
