import React from "react";
import { Routes, Route } from "react-router-dom";
import GuardianDashboard from "../pages/guardianPage/Dashboard";
import GuardianAnnouncement from "../pages/guardianPage/Announcement";
import GuardianRequirements from "../pages/guardianPage/Requirements";
import GuardianTeachersProfile from "../pages/guardianPage/TeachersProfile";

const GuardianRoutes = ({ sidebarOpen }) => (
  <Routes>
    <Route path="/guardiandashboard" element={<GuardianDashboard sidebarOpen={sidebarOpen} />} />
    <Route path="/guardian-announcement" element={<GuardianAnnouncement sidebarOpen={sidebarOpen} />} />
    <Route path="/guardian-teachers-profile" element={<GuardianTeachersProfile sidebarOpen={sidebarOpen} />} />
    <Route path="/guardian-requirements" element={<GuardianRequirements sidebarOpen={sidebarOpen} />} />
  </Routes>
);

export default GuardianRoutes;