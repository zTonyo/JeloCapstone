import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import picture from '../../assets/logo.png';


function GuardianTeachersProfile({ sidebarOpen }) {
  const [teachers, setTeachers] = useState([
    {
      position: "Teacher",
      name: "John Doe",
      contact: "09123456789",
      schedule: "K1- 8:00am-10:00am",
      email: "john@example.com",
      picture: picture
    },
    {
      position: "Admin",
      name: "Jane Smith",
      contact: "09876543210",
      schedule: "K2- 10:15am-12:15nn",
      email: "jane@example.com",
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInGuardian = localStorage.getItem("isLoggedInGuardian");

    if (isLoggedInGuardian === "false") {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Teacher's Profile</h2>
        <div className='d-flex justify-content-start teacher-profile-container'>
          <div className='teacher-profile-img'>
            <img src={teachers[0].picture} width="350px" alt='profilePic' />
          </div>
          <div className='align-self-center teacher-profile-body-infos'>
            <div className='d-flex align-items-center teacher-profile-infos'>
              <FontAwesomeIcon className='p-2' icon={faAddressCard} />
              <span className='p-2'>Adviser</span>
            </div>          
            {/* Accessing first teacher's data */}
            <p className='teacher-profile-info'>Name: {teachers[0].name}</p>
            <p className='teacher-profile-info'>Contact Number: {teachers[0].contact}</p>
            <p className='teacher-profile-info'>Schedule: {teachers[0].schedule}</p>
            <p className='teacher-profile-info'>Role: {teachers[0].position}</p> {/* Changed 'role' to 'position' */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuardianTeachersProfile;