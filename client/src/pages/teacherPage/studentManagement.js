import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentManagement({ sidebarOpen }) {
  const navigate = useNavigate();
  const [dbStudentManagement, setDbStudentManagement] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/studentManagement')  // Fixed URL typo
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setDbStudentManagement(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load student data');
        setLoading(false);
      });
  }, []);

  const checkRequirements = (student) => {
    const missingItems = [];
    if (!student.psa) missingItems.push('PSA');
    if (!student.immunizationCard) missingItems.push('Immunization Card');
    if (!student.photo) missingItems.push('Photo');
    if (!student.guardianQCID) missingItems.push('Guardian QCID');
    return missingItems.length > 0 ? missingItems : ['All requirements met'];
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'with-sidebar' : 'without-sidebar'}`}>
        <h2>Student Management</h2>
        <p>Welcome to your Student Management System</p>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Student I.D.</th>
              <th>Student Name</th>
              <th>Guardian</th>
              <th>Health History</th>
              <th>Student Schedule</th>
              <th>Requirements</th>
            </tr>
          </thead>
          <tbody>
            {dbStudentManagement.map((student) => (
              <tr key={student.id}>
                <td>{student.lName + student.bDay}</td>
                <td>{`${student.lName}, ${student.fName} ${student.mName}`}</td>
                <td>{`${student.guardianLName}, ${student.guardianFName} ${student.guardianMName}`}</td>
                <td>{student.healthHistory}</td>
                <td>{student.schedule}</td>
                <td>
                  {checkRequirements(student).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentManagement;
