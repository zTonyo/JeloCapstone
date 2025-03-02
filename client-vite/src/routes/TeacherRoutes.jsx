import React from "react";
import { Routes, Route } from "react-router-dom";
import TeacherDashboard from "../pages/teacherPage/Dashboard";
import StudentManagement from "../pages/teacherPage/StudentManagement";
import GuardianManagement from "../pages/teacherPage/GuardianManagement";
import TeacherManagement from "../pages/teacherPage/TeacherManagement";
import Announcement from "../pages/teacherPage/Announcement";
import Attendance from "../pages/teacherPage/Attendance";
import Grades from "../pages/teacherPage/Grades";
import Profile from "../pages/teacherPage/Profile";

const TeacherRoutes = ({ sidebarOpen }) => (
  <Routes>
    <Route path="/teacherdashboard" element={<TeacherDashboard sidebarOpen={sidebarOpen} />} />
    <Route path="/student-management" element={<StudentManagement sidebarOpen={sidebarOpen} />} />
    <Route path="/guardian-management" element={<GuardianManagement sidebarOpen={sidebarOpen} />} />
    <Route path="/teacher-management" element={<TeacherManagement sidebarOpen={sidebarOpen} />} />
    <Route path="/announcement" element={<Announcement sidebarOpen={sidebarOpen} />} />
    <Route path="/attendance" element={<Attendance sidebarOpen={sidebarOpen} />} />
    <Route path="/grades" element={<Grades sidebarOpen={sidebarOpen} />} />
    <Route path="/profile" element={<Profile sidebarOpen={sidebarOpen} />} />
  </Routes>
);

export default TeacherRoutes;