import React, { useEffect, useState } from "react";
import cdc from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

const EnrollNow = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("isLoggedInGuardian", "false");
  }, []);

  const [formData, setFormData] = useState({
    lName: '',
    fName: '',
    mName: '',
    suffix: '',
    bDay: '',
    age: '',
    sex: '',
    healthHistory: '',
    addressNumber: '',
    brgy: '',
    municipality: '',
    fatherLName: '',
    fatherFName: '',
    fatherMName: '',
    fatherContactNo: '',
    motherLName: '',
    motherFName: '',
    motherMName: '',
    motherContactNo: '',
    guardianLName: '',
    guardianFName: '',
    guardianMName: '',
    guardianContactNo: '',
    guardianRelationship: '',
    guardianEmail: '',
    guardianOccupation: '',
    schedule: '',
    psa: '',
    immunizationCard: '',
    photo: '',
    guardianQCID: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        console.log('User added:', result);
        alert('User successfully added!');
        navigate('/');
        window.scrollTo(0, 0);
      } else {
        console.error('Error adding user:', result);
        alert('Failed to add user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  return (
    <div>
      <div className="enroll-header d-flex justify-content-center align-items-center">
        <img src={cdc} className="enroll-header-img" width="125" height="125" alt="cdc" />
        <div className="text-center">
          <p className="enroll-header-text">CHILD DEVELOPMENT CENTER MANAGEMENT SYSTEM</p>
          <p className="enroll-header-text enroll-header-ep-text">ENROLLMENT PROCESS</p>
        </div>
        <img src={logo} className="enroll-header-img" width="100" height="100" alt="logo" />
      </div>

      <div className="enroll-body">
        <div className="enroll-body-div enroll-ftext">
          <p className="enroll-body-title">Application Process</p>
          <p>The Child Development Center’s online application process is simple, secure and convenient. You can start filling out your application now, save your progress, and complete it at your convenience. Once registered, you will receive a Student ID Number.</p>
        </div>
        <div className="enroll-body-div">
          <p className="enroll-body-title">Basic Requirements</p>
          <ul>
            <li>Your child meets the age requirement for enrollment</li>
            <li>You can provide a copy of your child's PSA</li>
            <li>Your child's immunizations are up to date (immunization records required).</li>
            <li>You have emergency contact details ready to include.</li>
          </ul>
        </div>
        <div className="enroll-body-div enroll-etext">
          <p className="enroll-body-title">NOTES:</p>
          <ul>
            <li>Fields with asterisk (*) are required.</li>
            <li>Requirements without an (*) can be submitted online through the Portal.</li>
            <li>Put a WORKING email, student number will be sent to your email.</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="enroll-body">
          <div className="enroll-body-div enroll-ftext">
            <p className="enroll-body-title">STUDENT BASIC INFORMATION</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" value={formData.lName} onChange={handleChange} type="text" name="lName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" value={formData.fName} onChange={handleChange} type="text" name="fName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Middle Name:</p>
                <input className="enroll-input-field" value={formData.mName} onChange={handleChange} type="text" name="mName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Suffix: (if applicable)</p>
                <input className="enroll-input-field" value={formData.suffix} onChange={handleChange} type="text" name="suffix" />
              </div>
            </div>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Birthdate:</p>
                <input className="enroll-input-field" value={formData.bDay} onChange={handleChange} type="date" name="bDay" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Age:</p>
                <input className="enroll-input-field" value={formData.age} onChange={handleChange} type="text" name="age" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Sex:</p>
                <select className="enroll-input-field" value={formData.sex} onChange={handleChange} name="sex" required>
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Health History: (if applicable)</p>
                <input className="enroll-input-field" value={formData.healthHistory} onChange={handleChange} type="text" name="healthHistory" required />
              </div>
            </div>
          </div>

          <div className="enroll-body-div">
            <p className="enroll-body-title">ADDRESS</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Address Number:</p>
                <input className="enroll-input-field" value={formData.addressNumber} onChange={handleChange} type="text" name="addressNumber" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Barangay:</p>
                <input className="enroll-input-field" value={formData.brgy} onChange={handleChange} type="text" name="brgy" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Municipality:</p>
                <input className="enroll-input-field" value={formData.municipality} onChange={handleChange} type="text" name="municipality" required />
              </div>
            </div>
          </div>

          <div className="enroll-body-div">
            <p className="enroll-body-title">PARENTS/GUARDIAN INFORMATION</p>
            {/* Father’s Information */}
            <p className="enroll-sub-text enroll-text-sub">Father's Name</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" value={formData.fatherLName} onChange={handleChange} type="text" name="fatherLName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" value={formData.fatherFName} onChange={handleChange} type="text" name="fatherFName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Middle Name:</p>
                <input className="enroll-input-field" value={formData.fatherMName} onChange={handleChange} type="text" name="fatherMName" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Contact Number:</p>
                <input className="enroll-input-field" value={formData.fatherContactNo} onChange={handleChange} type="text" name="fatherContactNo" required />
              </div>
            </div>
            {/* Mother’s Information */}
            <p className="enroll-sub-text enroll-text-sub">Mother's Name</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" value={formData.motherLName} onChange={handleChange} type="text" name="motherLName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" value={formData.motherFName} onChange={handleChange} type="text" name="motherFName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Middle Name:</p>
                <input className="enroll-input-field" value={formData.motherMName} onChange={handleChange} type="text" name="motherMName" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Contact Number:</p>
                <input className="enroll-input-field" value={formData.motherContactNo} onChange={handleChange} type="text" name="motherContactNo" required />
              </div>
            </div>
            {/* Guardian’s Information */}
            <p className="enroll-sub-text enroll-text-sub">Guardian's Name</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" value={formData.guardianLName} onChange={handleChange} type="text" name="guardianLName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" value={formData.guardianFName} onChange={handleChange} type="text" name="guardianFName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Middle Name:</p>
                <input className="enroll-input-field" value={formData.guardianMName} onChange={handleChange} type="text" name="guardianMName" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Contact Number:</p>
                <input className="enroll-input-field" value={formData.guardianContactNo} onChange={handleChange} type="text" name="guardianContactNo" required />
              </div>
            </div>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Relationship:</p>
                <select className="enroll-input-field" value={formData.guardianRelationship} onChange={handleChange} type="text" name="guardianRelationship" required>
                  <option value="">Select Relationship</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Relatives">Relatives</option>
                </select>
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Email:</p>
                <input className="enroll-input-field" value={formData.guardianEmail} onChange={handleChange} type="text" name="guardianEmail"/>
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Occupation:</p>
                <input className="enroll-input-field" value={formData.guardianOccupation} onChange={handleChange} type="text" name="guardianOccupation" />
              </div>
            </div>
          </div>

          <div className="enroll-body-div">
            <p className="enroll-body-title">ENROLLMENT INFORMATION</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Preferred Schedule:</p>
                <select className="enroll-input-field" value={formData.schedule} onChange={handleChange} type="text" name="schedule" required>
                  <option value="">Select schedule</option>
                  <option value="K1">K1(3y/o) - 8:00AM- 10:00AM</option>
                  <option value="K2">K2(4y/o) - 10:15AM-12:15PM</option>
                  <option value="K3">K3(4y/o) - 1:30PM-3:30PM</option>
                </select>
              </div>
            </div>
          </div>

          <div className="enroll-body-div enroll-etext">
            <p className="enroll-body-title">REQUIREMENTS</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Student PSA:</p>
                <input className="enroll-input-field" value={formData.psa} onChange={handleChange} type="text" name="psa" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Immunization Card:</p>
                <input className="enroll-input-field" value={formData.immunizationCard} onChange={handleChange} type="text" name="immunizationCard" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Recent Photo:</p>
                <input className="enroll-input-field" value={formData.photo} onChange={handleChange} type="text" name="photo" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Guardian QC ID:</p>
                <input className="enroll-input-field" value={formData.guardianQCID} onChange={handleChange} type="text" name="guardianQCID" required />
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EnrollNow;
