import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentManagement({ sidebarOpen }) {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
      navigate('/');
    };
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'with-sidebar' : 'withou-sidebar'}`}>
        <h2>Student Management</h2>
        <p>Welcome to your Smanagement</p>
      </div>
    </div>
  );
}

export default StudentManagement;
