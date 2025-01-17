import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/public/Navbar';
import NavBar from './components/private/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import TeacherLogin from './pages/TeacherLogin';
import TeacherSignin from './pages/TeacherSignin';
import './App.css';

function App() {
  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {/* Conditionally render the navbar based on login status */}
      {isLoggedIn ? <NavBar onLogout={handleLogout} /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teacherlogin" element={<TeacherLogin onLogin={handleLogin} />} />
        <Route path="/teachersignin" element={<TeacherSignin />} />
      </Routes>
    </Router>
  );
}

export default App;