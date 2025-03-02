import React from "react";
import { Routes, Route } from "react-router-dom";
import GuardianDashboard from "../pages/guardianPage/Dashboard";
import GuardianAnnouncement from "../pages/guardianPage/Announcement";

const GuardianRoutes = ({ sidebarOpen }) => (
  <Routes>
    <Route path="/guardiandashboard" element={<GuardianDashboard sidebarOpen={sidebarOpen} />} />
    <Route path="/guardian-announcement" element={<GuardianAnnouncement sidebarOpen={sidebarOpen} />} />
  </Routes>
);

export default GuardianRoutes;