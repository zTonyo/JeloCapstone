import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GuardianAnnouncement({ sidebarOpen }) {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInGuardian = localStorage.getItem("isLoggedInGuardian");

    if (isLoggedInGuardian === "false") {
      navigate('/');
    } else {
      fetch('http://localhost:5000/api/announcement')
        .then(response => response.json())
        .then(data => {
          setAnnouncements(data);
        })
        .catch(error => {
          console.error('Error fetching announcement data:', error);
        });
    }
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Announcement!</h2>
        {announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <div key={index} className='g-ann-container'>
              <div className='d-flex justify-content-center'>
                {announcement.picture && <img src={`http://localhost:5000${announcement.picture}`} alt={`Announcement ${index + 1}`} style={{ width: '20%' }} />}
              </div>
              <div className='g-ann-head'>
                <span className='g-ann-title text-left'>{announcement.title}</span>
                <p className='g-ann-date-time text-left'>{announcement.dateAndTime}</p>
                <p className='g-ann-desc text-left'>{announcement.description}</p>
              </div>              
              <hr />
            </div>
          ))
        ) : (
          <p>No announcements available</p> 
        )}
      </div>
    </div>
  );
}

export default GuardianAnnouncement;
