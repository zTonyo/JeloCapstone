import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Form } from "react-bootstrap";

function TeacherManagement({ sidebarOpen }) {
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
                    <Form.Select
                      value={teacher.position}
                      onChange={(e) => handleChange(index, "position", e.target.value)}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Staff">Staff</option>
                      <option value="Volunteer">Volunteer</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={teacher.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={teacher.contact}
                      onChange={(e) => handleChange(index, "contact", e.target.value)}
                    />
                  </td>
                  <td>
                    <Form.Select
                      value={teacher.schedule}
                      onChange={(e) => handleChange(index, "schedule", e.target.value)}
                    >
                      <option value="K1- 8:00am-10:00am">K1- 8:00am-10:00am</option>
                      <option value="K2- 10:15am-12:15nn">K2- 10:15am-12:15nn</option>
                      <option value="K3- 1:30pm-3:30pm">K3- 1:30pm-3:30pm</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      value={teacher.email}
                      onChange={(e) => handleChange(index, "email", e.target.value)}
                    />
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
