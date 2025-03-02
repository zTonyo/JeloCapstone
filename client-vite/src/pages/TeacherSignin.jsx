import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for React Router navigation
import { tailChase } from 'ldrs';
import axios from 'axios';

import mainCDC from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';

const serverPath = import.meta.env.VITE_BASE_PATH;
tailChase.register();

const TeacherSignin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });


  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update state dynamically
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Show loader

    try {
      const response = await axios.post(`${serverPath}/api/teacher/signup`, formData);
      alert("Account created successfully!");
      navigate('/teacherlogin');
    } catch (error) {
      console.error("Error:", error.response?.data?.message || "Something went wrong!");
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // Hide loader
    }
  };


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
        <p className="text-center">Create teacher account</p>
        <form id="signinForm" onSubmit={handleSubmit}>
          <span className="signin-sub-text">Teacher's information</span>
          <div className="form-group mt-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter e-mail"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              className="form-select"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select a role</option>
              <option value="Teacher">Teacher</option>
              <option value="Staff">Staff</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          {/* Show loading spinner while submitting */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase> : "Create"}
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
