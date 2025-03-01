import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";

import Layout from "./components/Layout";
import PublicRoutes from "./routes/publicRoutes";
import TeacherRoutes from "./routes/teacherRoutes";
import GuardianRoutes from "./routes/GuardianRoutes";

import "./App.css";

library.add(fas, faFontAwesome, faTwitter);

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

  return (
    <Router>
      <Layout
        isLoggedIn={isLoggedIn}
        isLoggedInGuardian={isLoggedInGuardian}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      >
        {isLoggedIn ? (
          <TeacherRoutes sidebarOpen={sidebarOpen} />
        ) : isLoggedInGuardian ? (
          <GuardianRoutes sidebarOpen={sidebarOpen} />
        ) : (
          <PublicRoutes onLoginTeacher={handleLoginTeacher} onLoginGuardian={handleLoginGuardian} />
        )}
      </Layout>
    </Router>
  );
}

export default App;