import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GuardianManagement({ sidebarOpen }) {
  const navigate = useNavigate();
  const [dbGuardianManagement, setDbGuardianManagement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
      navigate('/');
    };
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/guardianManagement')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setDbGuardianManagement(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load student data');
        setLoading(false);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = dbGuardianManagement.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dbGuardianManagement.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Guardian Management</h2>
        <p>Welcome to your Gmanagement</p>
        <div className='teacher-div-table'>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr className='text-center table-head-columns'>
                <th scope='col'>Student Name</th>
                <th scope='col'>Relationship</th>
                <th scope='col'>Guardian Name</th>
                <th scope='col'>Contact Number</th>
                <th scope='col'>Email</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr className='tbody-content'>
                  <td>{`${student.lName}, ${student.fName} ${student.mName}`}</td>
                  <td>{student.guardianRelationship}</td>
                  <td>{`${student.guardianLName}, ${student.guardianFName} ${student.guardianMName}`}</td>
                  <td>{student.guardianContactNo}</td>
                  <td>{student.guardianEmail}</td>
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

export default GuardianManagement;