import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import EnrollNow from "../pages/EnrollNow";
import TeacherLogin from "../pages/TeacherLogin";
import TeacherSignin from "../pages/TeacherSignin";
import GuardianLogin from "../pages/GuardianLogin";
import GuardianSignin from "../pages/GuardianSignin";

const PublicRoutes = ({ onLoginTeacher, onLoginGuardian }) => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/enroll" element={<EnrollNow />} />
    <Route path="/teacherlogin/*" element={<TeacherLogin onLogin={onLoginTeacher} />} />
    <Route path="/guardianlogin" element={<GuardianLogin onLogin={onLoginGuardian} />} />
    <Route path="/teachersignin" element={<TeacherSignin />} />
    <Route path="/guardiansignin" element={<GuardianSignin />} />
  </Routes>
);

export default PublicRoutes;