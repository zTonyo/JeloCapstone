import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import mainCDC from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';
import axios from 'axios';

const serverPath = import.meta.env.VITE_BASE_PATH;


const TeacherLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const confirmed = searchParams.get("confirmed");
  const error = searchParams.get("error");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${serverPath}/api/teacher/signin`,
        { username, password },
        { withCredentials: true } // Ensures cookies (sessions) are included
      );
      localStorage.setItem("profilePicture", response.data.profilePicture || null);
      localStorage.setItem("isLoggedIn", "true");
      onLogin();
      navigate('/teacherdashboard');
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  useEffect(() => {
    if (confirmed) {
        setMessage("Your email has been confirmed! You can now log in.");
    } else if (error) {
      setMessage(error === "expired" ? "Confirmation link expired!" : "Invalid confirmation link.");
    }
}, [confirmed, error]);


  
  return (
    <div className="teacher-container d-flex justify-content-around">
      <div className="align-self-center left-img">
        <img src={mainCDC} className="mainCDC" alt="mainCDC" />
        <p className="text-center child-text">
          CHILD DEVELOPMENT CENTER MANAGEMENT SYSTEM
        </p>
      </div>
      <div className="login-form d-flex flex-column">
        <img
          src={logo}
          style={{ margin: 'auto', marginBottom: '10px', marginTop: '20px' }}
          width="100"
          height="100"
          alt="logo"
        />
        <p className="text-center">Login to your Teacher account</p>
        {message && <div className="alert alert-info text-center">{message}</div>}
        <form onSubmit={handleSubmit} id="loginForm">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              value={username} 
              placeholder="johndoe@gmail.com" 
              onChange={(e)=>setUsername(e.target.value)} 
              required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              value={password} 
              placeholder="Enter password" 
              onChange={(e) => setPassword(e.target.value)} 
              required/>
          </div>
          <div className="d-flex justify-content-between">
            <div className="remember-me form-group">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="form-group forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="p-2 text-center text-link">
          Don’t Have An Account?{' '}
          <Link to="/teachersignin">Click Here</Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;