import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GuardianAnnouncement({ sidebarOpen }) {
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
        <h2>Guardian Announcement</h2>
        <p>Welcome to your Guardian Announcement</p>
      </div>
    </div>
  );
}

export default GuardianAnnouncement;
