import React, { useState, useEffect } from "react";
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/public/Navbar";
import NavBar from "./components/private/NavBar";
import NavBarGuardian from "./components/private/NavBarGuardian";

import Home from "./pages/Home";
import About from "./pages/About";
import EnrollNow from "./pages/EnrollNow";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherSignin from "./pages/TeacherSignin";
import GuardianLogin from "./pages/GuardianLogin";
import GuardianSignin from "./pages/GuardianSignin";

import TeacherDashboard from "./pages/teacherPage/Dashboard";
import StudentManagement from "./pages/teacherPage/StudentManagement";
import GuardianManagement from "./pages/teacherPage/GuardianManagement";
import TeacherManagement from "./pages/teacherPage/TeacherManagement";
import Announcement from "./pages/teacherPage/Announcement";
import Attendance from "./pages/teacherPage/Attendance";
import Grades from "./pages/teacherPage/Grades";
// import AiRecord from "./pages/teacherPage/aiRecord";

import GuardianDashboard from "./pages/guardianPage/Dashboard";
import GuardianAnnouncement from "./pages/guardianPage/Announcement";
import GuardianTeachersProfile from "./pages/guardianPage/TeachersProfile";

import "./App.css";

library.add(fas, faFontAwesome, faTwitter)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInGuardian, setIsLoggedInGuardian] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load authentication status from localStorage
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setIsLoggedInGuardian(localStorage.getItem("isLoggedInGuardian") === "true");
  }, []);

  // Handle login for teacher
  const handleLoginTeacher = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  // Handle login for guardian
  const handleLoginGuardian = () => {
    setIsLoggedInGuardian(true);
    localStorage.setItem("isLoggedInGuardian", "true");
  };

  // Determine which navbar to render
  let navbarComponent;
  if (isLoggedIn) {
    navbarComponent = <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
  } else if (isLoggedInGuardian) {
    navbarComponent = <NavBarGuardian sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />;
  } else {
    navbarComponent = <Navbar />;
  }

  return (
    <Router>
      {navbarComponent}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/enroll" element={<EnrollNow />} />
        <Route path="/teacherlogin" element={<TeacherLogin onLogin={handleLoginTeacher} />} />
        <Route path="/guardianlogin" element={<GuardianLogin onLogin={handleLoginGuardian} />} />
        <Route path="/teachersignin" element={<TeacherSignin />} />
        <Route path="/guardiansignin" element={<GuardianSignin />} />

        {/* Teacher Routes */}
        <Route path="/teacherdashboard" element={<TeacherDashboard sidebarOpen={sidebarOpen} />} />
        <Route path="/student-management" element={<StudentManagement sidebarOpen={sidebarOpen} />} />
        <Route path="/guardian-management" element={<GuardianManagement sidebarOpen={sidebarOpen} />} />
        <Route path="/teacher-management" element={<TeacherManagement sidebarOpen={sidebarOpen} />} />
        <Route path="/announcement" element={<Announcement sidebarOpen={sidebarOpen} />} />
        <Route path="/attendance" element={<Attendance sidebarOpen={sidebarOpen} />} />
        <Route path="/grades" element={<Grades sidebarOpen={sidebarOpen} />} />
        {/* <Route path="/ai-record" element={<AiRecord sidebarOpen={sidebarOpen} />} /> */}

        {/* Guardian Routes */}
        <Route path="/guardiandashboard" element={<GuardianDashboard sidebarOpen={sidebarOpen} />} />
        <Route path="/guardian-announcement" element={<GuardianAnnouncement sidebarOpen={sidebarOpen} />} />
        <Route path="/guardian-teachers-profile" element={<GuardianTeachersProfile sidebarOpen={sidebarOpen} />} />
      </Routes>
    </Router>
  );
}

export default App;
