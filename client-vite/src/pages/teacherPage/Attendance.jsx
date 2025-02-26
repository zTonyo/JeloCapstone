import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Form } from "react-bootstrap";

function Attendance({ sidebarOpen }) {

  const [teachers, setTeachers] = useState([
      {
        position: "Teacher",
        name: "John Doe",
        contact: "09123456789",
        schedule: "K1- 8:00am-10:00am",
        email: "john@example.com",
      },
      {
        position: "Admin",
        name: "Jane Smith",
        contact: "09876543210",
        schedule: "K2- 10:15am-12:15nn",
        email: "jane@example.com",
      },
    ]);
  
    const handleChange = (index, field, value) => {
      const updatedTeachers = [...teachers];
      updatedTeachers[index][field] = value;
      setTeachers(updatedTeachers);
    };
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
      <h2>Teacher Management</h2>
        <div className='container-fluid px-3 mt-3'>
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>Student ID</th>
                <th>Student Full Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  ID
                </td>
                <td>
                  Student Name                  
                </td>
                <td>
                  Present/Absent
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
