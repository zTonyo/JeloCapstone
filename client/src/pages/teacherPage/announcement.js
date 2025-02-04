import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Announcement({ sidebarOpen }) {
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
        <h2>Announcement</h2>
        <p>Welcome to your Announcement</p>
      </div>
    </div>
  );
}

export default Announcement;
