import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faUsers, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';


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
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <p className='td-head'>Welcome to Child Development Center Management System</p>
        
        <div className='border border-2 border-danger container-fluid'>
        <p className='td-title'>Dashboard</p>
          <div className='d-flex gap-5'>
              <div className='flex-fill border border-secondary shadow rounded p-2'>
                <p className='fs-5'>
                  <FontAwesomeIcon className='' icon={faGaugeHigh} /> Guardian
                </p>
              </div>
              <div className='flex-fill border border-secondary shadow rounded p-2'>
              <p className='fs-5'>
                  <FontAwesomeIcon className='' icon={faUsers} /> Enrolled
                </p>
              </div>
              <div className='flex-fill border border-secondary shadow rounded p-2'>
              <p className='fs-5'>
                  <FontAwesomeIcon className='' icon={faPeopleRoof} /> Parent Portal
                </p>
              </div>
          </div>

          <div className='container'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
