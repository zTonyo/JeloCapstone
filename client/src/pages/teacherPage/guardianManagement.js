import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function GuardianManagement({ sidebarOpen }) {
  const navigate = useNavigate();
  const [dbGuardianManagement, setDbGuardianManagement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
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

  const handleUpdateClick = (student) => {
    setSelectedStudent({ ...student });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const studentFullName = `${selectedStudent.fName} ${selectedStudent.mName} ${selectedStudent.lName}`;
    fetch(`http://localhost:5000/api/updateGuardian/${encodeURIComponent(studentFullName)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        guardianFName: selectedStudent.guardianFName,
        guardianMName: selectedStudent.guardianMName,
        guardianLName: selectedStudent.guardianLName,
        guardianContactNo: selectedStudent.guardianContactNo,
        guardianEmail: selectedStudent.guardianEmail,
        guardianRelationship: selectedStudent.guardianRelationship,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update guardian data');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Guardian updated:', data);
      setShowModal(false);
      setDbGuardianManagement((prevData) =>
        prevData.map((student) =>
          `${student.fName} ${student.mName} ${student.lName}` === studentFullName
            ? { ...student, ...data }
            : student
        )
      );
    })
    .catch((error) => {
      console.error('Error updating guardian:', error);
    });
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSelectedStudent((prevSelectedStudent) => ({
      ...prevSelectedStudent,
      [id]: value,
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = dbGuardianManagement.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dbGuardianManagement.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [dbGuardianManagement]);

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
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">No students available</td>
                </tr>
              ) : (
                currentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{`${student.lName}, ${student.fName} ${student.mName}`}</td>
                    <td>{student.guardianRelationship}</td>
                    <td>{`${student.guardianLName}, ${student.guardianFName} ${student.guardianMName}`}</td>
                    <td>{student.guardianContactNo}</td>
                    <td>{student.guardianEmail}</td>
                    <td className="td-btn"><button className="btn-edit-table" onClick={() => handleUpdateClick(student)}><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <ul className="pagination justify-content-center pagination-content">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modal for updating the guardian */}
      {showModal && selectedStudent && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">Update Guardian</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateSubmit}>
                  <div className="form-group">
                    <label htmlFor="guardianName">Student Name</label>
                    <input disabled type="text" className="form-control" id="fName" value={`${selectedStudent.fName} ${selectedStudent.mName} ${selectedStudent.lName}`} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardianName">Guardian Name</label>
                    <input disabled type="text" className="form-control" id="guardianFName" value={`${selectedStudent.guardianFName} ${selectedStudent.guardianMName} ${selectedStudent.guardianLName}`} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardianName">Relationship</label>
                    <select type="text" className="form-control" id="guardianRelationship" value={selectedStudent.guardianRelationship} onChange={handleInputChange} required>
                      <option value="">Select Relationship</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Grandparent">Grandparent</option>
                      <option value="Relatives">Relatives</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardianContactNo">Contact Number</label>
                    <input disabled type="text" className="form-control" id="guardianContactNo" value={selectedStudent.guardianContactNo} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardianEmail">Email</label>
                    <input disabled type="email" className="form-control" id="guardianEmail" value={selectedStudent.guardianEmail} onChange={handleInputChange} />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GuardianManagement;
