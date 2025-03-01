import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Form } from "react-bootstrap";
import axios from "axios";

const serverPath = import.meta.env.VITE_BASE_PATH;

function TeacherManagement({ sidebarOpen }) {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
      navigate('/');
    } else {
      getUsers();
    }
  }, [navigate]);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teacher/users", { withCredentials: true });
      const formattedData = response.data.map(user => ({
        position: user.position,
        name: user.name,
        contact: user.contact_number, // Assuming this contains the contact number
        schedule: "", // Placeholder for schedule since it is not in your DB
        email: user.email
      }));
      console.log(formattedData);
      setTeachers(formattedData);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[index][field] = value;
    setTeachers(updatedTeachers);
  };

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <div className='d-flex justify-content-between align-items-center pe-4'>
          <h2>Teacher Management</h2>
          <a className='btn btn-info text-white' type='button' href="">Add User</a>
        </div>

        <div className='container-fluid px-3 mt-3'>
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>Position</th>
                <th>Teacher's Name</th>
                <th>Contact Number</th>
                <th>Schedule</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
            {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>
                  {teacher.position}
                    {/* <Form.Select
                      value={teacher.position}
                      onChange={(e) => handleChange(index, "position", e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Staff">Staff</option>
                      <option value="Volunteer">Volunteer</option>
                    </Form.Select> */}
                  </td>
                  <td>
                  {teacher.name}
                    {/* <Form.Control
                      type="text"
                      value={teacher.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                    /> */}
                  </td>
                  <td>
                    {teacher.contact}
                    {/* <Form.Control
                      type="text"
                      value={teacher.contact}
                      onChange={(e) => handleChange(index, "contact", e.target.value)}
                    /> */}
                  </td>
                  <td>
                    
                    {/* <Form.Select
                      value={teacher.schedule}
                      onChange={(e) => handleChange(index, "schedule", e.target.value)}
                    >
                      <option value="K1- 8:00am-10:00am">K1- 8:00am-10:00am</option>
                      <option value="K2- 10:15am-12:15nn">K2- 10:15am-12:15nn</option>
                      <option value="K3- 1:30pm-3:30pm">K3- 1:30pm-3:30pm</option>
                    </Form.Select> */}
                  </td>
                  <td>
                    {teacher.email}
                    {/* <Form.Control
                      type="email"
                      value={teacher.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TeacherManagement;
