import React from 'react';
import { Link } from 'react-router-dom';
import mainCDC from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';

const TeacherLogin = () => {
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
        <p className="text-center">Login to your account</p>
        <form id="loginForm">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              required
            />
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
          <Link to="/TeacherSignin">Click Here</Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;