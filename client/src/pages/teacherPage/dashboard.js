import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard({ sidebarOpen }) {
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
        <p className='td-head'>Welcome to Child Development Center Management System</p>
        <p className='td-title'>Dashboard</p>
      </div>
    </div>
  );
}

export default TeacherDashboard;
