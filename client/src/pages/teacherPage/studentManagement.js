import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentManagement({ sidebarOpen }) {
  const navigate = useNavigate();
  const [dbStudentManagement, setDbStudentManagement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/studentManagement')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setDbStudentManagement(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load student data');
        setLoading(false);
      });
  }, []);

  const checkRequirements = (student) => {
    const missingItems = [];
    // if (!student.psa) missingItems.push('PSA');
    if (!student.immunizationCard) missingItems.push('Immunization Card');
    if (!student.photo) missingItems.push('Photo');
    // if (!student.guardianQCID) missingItems.push('Guardian QCID');
    return missingItems.length > 0 ? missingItems : ['All requirements met'];
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = dbStudentManagement.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dbStudentManagement.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Student Management</h2>
        <p>Welcome to your Student Management System</p>
        <div className='teacher-div-table'>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr className='text-center table-head-columns'>
                <th scope='col'>Student I.D.</th>
                <th scope='col'>Student Name</th>
                <th scope='col'>Guardian</th>
                <th scope='col'>Health History</th>
                <th scope='col'>Student Schedule</th>
                <th scope='col'>Requirements</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr className='tbody-content' key={student.id}>
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
          {/* Pagination Controls */}
          <div className="pagination-container">
            <ul className="pagination justify-content-center pagination-content">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} 
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button 
                    className="page-link" 
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentManagement;
