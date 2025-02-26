import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faUsers, faPeopleRoof, faFileArchive } from '@fortawesome/free-solid-svg-icons';

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["React", "Vue", "Angular", "Svelte"],
  datasets: [
    {
      data: [40, 25, 20, 15], // Values for each section
      backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"], // Colors
      hoverBackgroundColor: ["#0077E6", "#009F89", "#E6A700", "#E65A00"], // Hover effect colors
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "1%", 
};


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
        <p className='fw-bold fs-2'>Welcome to Child Development Center Management System</p>
        
        <div className='container-fluid'>
        <p className='fw-bold fs-4'>Dashboard</p>
          <div className='d-flex gap-5'>
              <div className='flex-fill shadow rounded p-2'>
                <p className='fs-5'>
                  <FontAwesomeIcon className='' icon={faPeopleRoof} /> Parent
                </p>
              </div>
              <div className='flex-fill shadow rounded p-2'>
              <p className='fs-5'>
                  <FontAwesomeIcon className='' icon={faUsers} /> Student
                </p>
              </div>
              <div className='flex-fill shadow rounded p-2'>
              <p className='fs-5'>
                  <FontAwesomeIcon className='' icon={faFileArchive} /> Complete Requirements
                </p>
              </div>
          </div>

            <h3 className='fw-bold fs-4 mt-5'>Analytics</h3>
          <div className='shadow rounded p-3 d-flex align-items-start justify-content-evenly'>
            <div>
              <h5>Attendance</h5>
              <div className='mt-2' style={{ width: "300px", height : "300px" }}>
                <Doughnut data={data} options={options} />
              </div>
            </div>
            <div>
              <h5>Students Requirements</h5>
              <div className='mt-2' style={{ width: "300px", height : "300px" }}>
                <Doughnut data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
