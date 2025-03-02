import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // Import the calendar
import 'react-calendar/dist/Calendar.css'; // Import default styles

function GuardianAttendance({ sidebarOpen }) {
  const [date, setDate] = useState([
    {
      "studentId": "S001",
      "date": "2025-03-03",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-04",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-05",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-06",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-07",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-10",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-11",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-12",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-13",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-14",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-17",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-18",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-19",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-20",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-21",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-24",
      "status": "absent"
    },
    {
      "studentId": "S001",
      "date": "2025-03-25",
      "status": "present"
    },
    {
      "studentId": "S001",
      "date": "2025-03-26",
      "status": "absent"
    },
    {
      "studentId": "S001",
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

  const handleTileClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Attendance</h2>
        <div>
          <Calendar
            tileClassName={tileClassName}
            tileContent={tileContent}
            onClickDay={handleTileClick}
            locale="en-US"
          />
        </div>
      </div>
    </div>
  );
}

export default GuardianAttendance;
