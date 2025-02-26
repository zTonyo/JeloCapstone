import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GuardianDashboard({ sidebarOpen }) {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedInGuardian = localStorage.getItem("isLoggedInGuardian");

    if (isLoggedInGuardian === "false") {
      navigate('/');
    };
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <p className='td-head'>Welcome to Child Development Center Management System</p>
        <p className='td-title'>Dashboard Guardian</p>
      </div>
    </div>
  );
}

export default GuardianDashboard;
