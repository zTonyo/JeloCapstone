import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for React Router navigation
import mainCDC from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';

const GuardianSignin = () => {
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
        <p className="text-center">Create an guardian account</p>
        <form id="signinForm">
          <span className='signin-sub-text'>Guardian information</span>
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
          <span className='signin-sub-text'>Child's information</span>
          <div className="form-group">
            <label htmlFor="role">Name</label>
            <input type="text" className="form-control" id="childName" placeholder="Enter your child name" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Child ID #</label>
            <input type="text" className="form-control" id="childNumber" placeholder="Enter your child ID number" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
        <div className="p-2 text-center text-link">
          Already have an account?{' '}
          <Link to="/guardianlogin">Log-in Here</Link>
        </div>
      </div>
    </div>
  );
};

export default GuardianSignin;
