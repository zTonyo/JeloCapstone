import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for React Router navigation
import mainCDC from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';

const TeacherSignin = () => {
  return (
    <div className="teacher-container d-flex justify-content-around">
      <div className="align-self-center left-img">
        <img src={mainCDC} className="mainCDC" alt="mainCDC" />
        <p className="text-center child-text">
          CHILD DEVELOPMENT CENTER MANAGEMENT SYSTEM
        </p>
      </div>
      <div className="signin-form d-flex flex-column">
        {/* Fix inline styles using style object */}
        <img src={logo} style={{ margin: 'auto', marginBottom: '10px', marginTop: '20px' }} width="100" height="100" alt="logo" />
        <p className="text-center">Create an account</p>
        <form id="signinForm">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" required/>
          </div>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="email" className="form-control" id="username" placeholder="Enter e-mail" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" required/>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input type="text" className="form-control" id="role" placeholder="Enter role" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
        <div className="p-2 text-center text-link">
          Already have an account?{' '}
          <Link to="/teacherlogin">Log-in Here</Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignin;
