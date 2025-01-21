import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
      navigate('/');
    };
  }, [navigate]);

  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default TeacherDashboard;
