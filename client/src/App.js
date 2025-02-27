import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/public/Navbar';
import NavBar from './components/private/NavBar';
import NavBarGuardian from './components/private/NavBarGuardian';

import Home from './pages/Home';
import About from './pages/About';
import EnrollNow from './pages/EnrollNow';
import TeacherLogin from './pages/TeacherLogin';
import TeacherSignin from './pages/TeacherSignin';
import GuardianLogin from './pages/GuardianLogin';
// import GuardianSignin from './pages/GuardianSignin';

import TeacherDashboard from './pages/teacherPage/dashboard';
import StudentManagement from './pages/teacherPage/studentManagement';
import GuardianManagement from './pages/teacherPage/guardianManagement';
import TeacherManagement from './pages/teacherPage/teacherManagement';
import Announcement from './pages/teacherPage/announcement';
import Attendance from './pages/teacherPage/attendance';
import Grades from './pages/teacherPage/grades';
// import aiRecord from './pages/teacherPage/aiRecord';

import GuardianDashboard from './pages/guardianPage/dashboard';
import './App.css';
import GuardianAnnouncement from './pages/guardianPage/announcement';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInGuardian, setIsLoggedInGuardian] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInStatusGuardian = localStorage.getItem('isLoggedInGuardian') === 'true';
    setIsLoggedIn(loggedInStatus);
    setIsLoggedInGuardian(loggedInStatusGuardian);
  }, []);

  const handleLoginTeacher = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLoginGuardian = () => {
    setIsLoggedInGuardian(true);
    localStorage.setItem('isLoggedInGuardian', 'true');
  }

  return (
    <Router>
      {!isLoggedIn && !isLoggedInGuardian ? (<Navbar />) : 
      isLoggedIn && !isLoggedInGuardian ? (<NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />) : 
      !isLoggedIn && isLoggedInGuardian ? (<NavBarGuardian sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />) : 
      null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/enroll" element={<EnrollNow />} />
        <Route path="/teacherlogin" element={<TeacherLogin onLogin={handleLoginTeacher} />} />
        <Route path="/guardianlogin" element={<GuardianLogin onLogin={handleLoginGuardian} />} />
        <Route path="/teachersignin" element={<TeacherSignin />} />
        {/* <Route path="/guardiansignin" element={<GuardianSignin />} /> */}

        <Route path="/teacherdashboard" element={<TeacherDashboard sidebarOpen={sidebarOpen} />} />
        <Route path="/student-management" element={<StudentManagement sidebarOpen={sidebarOpen} />} />
        <Route path="/guardian-management" element={<GuardianManagement sidebarOpen={sidebarOpen} />} />
        <Route path="/teacher-management" element={<TeacherManagement sidebarOpen={sidebarOpen} />} />
        <Route path="/announcement" element={<Announcement sidebarOpen={sidebarOpen} />} />
        <Route path="/attendance" element={<Attendance sidebarOpen={sidebarOpen} />} />
        <Route path="/grades" element={<Grades sidebarOpen={sidebarOpen} />} />
        {/* <Route path="/ai-record" element={<aiRecord sidebarOpen={sidebarOpen} />} /> */}

        <Route path="/guardiandashboard" element={<GuardianDashboard sidebarOpen={sidebarOpen} />} />
        <Route path="/guardian-announcement" element={<GuardianAnnouncement sidebarOpen={sidebarOpen} />} />
      </Routes>
    </Router>
  );
}

export default App;
