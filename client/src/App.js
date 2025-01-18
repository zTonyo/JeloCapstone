import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/public/Navbar';
import NavBar from './components/private/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import TeacherLogin from './pages/TeacherLogin';
import TeacherSignin from './pages/TeacherSignin';
import TeacherDashboard from './pages/teacherPage/dashboard'; // Teacher dashboard page
import './App.css';

function App() {
  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the app loads
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Store login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove login state from localStorage
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      {/* Conditionally render the navbar based on login state */}
      {isLoggedIn ? <NavBar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teacherlogin" element={<TeacherLogin onLogin={handleLogin} />} />
        <Route path="/teachersignin" element={<TeacherSignin />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
