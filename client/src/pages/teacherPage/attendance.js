import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Attendance({ sidebarOpen }) {
  const navigate = useNavigate();
  const [dbAttendance, setDbAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [date, setDate] = useState('');
  const [scheduleFilter, setScheduleFilter] = useState('');

  // useEffect(() => {
  //   const today = new Date().toISOString().split('T')[0];
  //   setDate(today);
  //   console.log(`${today}`);

  // }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "false") {
      navigate('/');
    };
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/attendance')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setDbAttendance(data);
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

  const handleScheduleChange = (event) => {
    setScheduleFilter(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredAttendance = scheduleFilter
    ? dbAttendance.filter((student) => student.schedule === scheduleFilter)
    : dbAttendance;
  const currentStudents = filteredAttendance.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <div className='d-flex justify-content-between align-items-center teacher-title'>
          <h2>Attendance</h2>
          <div className='d-flex justify-content-between'>
            <select type="text" id="schedule" value={scheduleFilter} onChange={handleScheduleChange}>
              <option value="">All Schedules</option>
              <option value="K1">K1(3y/o) - 8:00AM- 10:00AM</option>
              <option value="K2">K2(4y/o) - 10:15AM-12:15PM</option>
              <option value="K3">K3(4y/o) - 1:30PM-3:30PM</option>
            </select>
            <input type="date" name="date" value={date} />
          </div>
        </div>
        <div className='teacher-div-table'>
          <table className='table table-bordered table-striped table-sm'>
            <thead>
              <tr className='text-center table-head-columns'>
                <th scope='col'>Student I.D.</th>
                <th scope='col'>Student Name</th>
                <th scope='col'>Status</th>
                <th scope='col'>Schedule</th>
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
                  <tr key={student.studentID}>
                    <td>{student.studentID}</td>
                    <td>{student.fullName}</td>
                    <td>{student.status}</td>
                    <td>{student.schedule}</td>
                    {/* <td className="td-btn"><button className="btn-edit-table" onClick={() => handleUpdateClick(student)}><FontAwesomeIcon icon={faPenToSquare} /></button></td> */}
                    <td className="td-btn"><button className="btn-edit-table" ><FontAwesomeIcon icon={faPenToSquare} /></button></td>
                  </tr>
                ))
              )}
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
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
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
        </div>
      </div>

      {/* Modal for updating the guardian
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
                    <label htmlFor="guardianName">Student ID</label>
                    <input disabled type="text" className="form-control" id="fName" value={student.studentID} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardianName">Student Name</label>
                    <input disabled type="text" className="form-control" id="guardianFName" value={student.fullName} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="guardianName">Status</label>
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
      )} */}
    </div>
  );
}

export default Attendance;
