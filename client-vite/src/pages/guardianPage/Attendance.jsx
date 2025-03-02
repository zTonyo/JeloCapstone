import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import jsPDF from 'jspdf';

function GuardianAttendance({ sidebarOpen }) {
  const [date, setDate] = useState([
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-03",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-04",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-05",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-06",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-07",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-10",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-11",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-12",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-13",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-14",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-17",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-18",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-19",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-20",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-21",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-24",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-25",
      "status": "present"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-26",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "studentName": "King S. Almon",
      "date": "2025-03-27",
      "status": "present"
    }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInGuardian = localStorage.getItem("isLoggedInGuardian");

    if (isLoggedInGuardian === "false") {
      navigate('/');
    }
  }, [navigate]);

  const attendanceMap = date.reduce((acc, { date, status }) => {
    acc[date] = status;
    return acc;
  }, {});

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.getFullYear() + '-' + 
                          String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(date.getDate()).padStart(2, '0');
      if (attendanceMap[dateString] === 'absent') {
        return 'absent';
      }
      if (attendanceMap[dateString] === 'present') {
        return 'present';
      }
    }
    return '';
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.getFullYear() + '-' + 
                          String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                          String(date.getDate()).padStart(2, '0');
      if (attendanceMap[dateString] === 'present') {
        return <p className="attendance-text">Present</p>;
      }
      if (attendanceMap[dateString] === 'absent') {
        return <p className="attendance-text">Absent</p>;
      }
    }
    return null;
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF('landscape', 'px', [792, 612]);
  //   const calendarElement = document.querySelector('.react-calendar');
  //   const scale = 0.75;
  //   calendarElement.style.transform = `scale(${scale})`;
  //   calendarElement.style.transformOrigin = 'top left';
  //   doc.html(calendarElement, {
  //     callback: function (doc) {
  //       doc.save('attendance-calendar.pdf');
  //     },
  //     margin: [10, 10, 10, 10],
  //   });
  //   setTimeout(() => {
  //     calendarElement.style.transform = '';
  //     calendarElement.style.transformOrigin = '';
  //   }, 1000);
  // };

  const downloadPDF = () => {
    const doc = new jsPDF('portrait', 'px', [792, 612]);
    const tableElement = document.querySelector('.teacher-div-table');  
    const scale = .8;
    tableElement.style.transform = `scale(${scale})`;
    tableElement.style.transformOrigin = 'top left';
    tableElement.style.width = '700px'
    doc.html(tableElement, {
      callback: function (doc) {
        doc.save('attendance-calendar.pdf');
      },
      margin: [10, 10, 10, 10],
      autoPaging: 'text',
      x: 10,
      y: 10
    });
    setTimeout(() => {
      tableElement.style.transform = '';
      tableElement.style.transformOrigin = '';
      tableElement.style.width = '';
    }, 1000);
  };

  const handleTileClick = (e) => {
    e.preventDefault();
  };

  // Function to render the attendance table
  const renderAttendanceTable = () => {
    return (
      <div className='guardian-attendance-container'>
        <table className='table table-bordered table-striped table-sm'>
          <thead>
            <tr className='text-center table-head-columns'>
              <th scope='col'>Student I.D.</th>
              <th scope='col'>Student Name</th>
              <th scope='col'>Date</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {date.length > 0 ? (
              date.map((attendance) => (
                <tr key={attendance.date}>
                  <td className='announcement-tbl-center'>{attendance.studentId}</td>
                  <td className='announcement-tbl-center'>{attendance.studentName}</td>
                  <td className='announcement-tbl-center'>{attendance.date}</td>
                  <td className='announcement-tbl-center'>{attendance.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No attendance available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Attendance</h2>
        <div>
          <Calendar tileClassName={tileClassName} tileContent={tileContent} onClickDay={handleTileClick} locale="en-US" />
          {renderAttendanceTable()}
        </div>
        <button onClick={downloadPDF} className="btn btn-primary announcement-create-btn">Download as PDF</button>
      </div>
    </div>
  );
}

export default GuardianAttendance;
