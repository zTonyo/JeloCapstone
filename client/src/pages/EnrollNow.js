import React, { useEffect } from "react";
import cdc from '../assets/cropMainCDC.png';
import logo from '../assets/logo.png';

const EnrollNow = () => {
  useEffect(() => {
    localStorage.setItem("isLoggedIn", "false");
  }, []);

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
          <p className="enroll-body-title">Basic Rquirements</p>
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

      <form>
        <div className="enroll-body">
          <div className="enroll-body-div enroll-ftext">
            <p className="enroll-body-title">STUDENT BASIC INFORMATION</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" type="text" name="lName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" type="text" name="fName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Middle Name:</p>
                <input className="enroll-input-field" type="text" name="mName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Suffix: (if applicable)</p>
                <input className="enroll-input-field" type="text" name="suffix" />
              </div>
            </div>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Birthdate:</p>
                <input className="enroll-input-field" type="date" name="bDay" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Age:</p>
                <input className="enroll-input-field" type="text" name="age" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Sex:</p>
                <select className="enroll-input-field" name="sex" required>
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Health History: (if applicable)</p>
                <input className="enroll-input-field" type="text" name="age" required />
              </div>
            </div>
          </div>

          <div className="enroll-body-div">
            <p className="enroll-body-title">ADDRESS</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Address Number:</p>
                <input className="enroll-input-field" type="text" name="addressNumber" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Barangay:</p>
                <input className="enroll-input-field" type="text" name="brgy" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Municipality:</p>
                <input className="enroll-input-field" type="text" name="municipality" required />
              </div>
            </div>
          </div>

          <div className="enroll-body-div">
            <p className="enroll-body-title">PARENTS/GUARDIAN INFORMATION</p>
            <p className="enroll-sub-text enroll-text-sub">Father's Name</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" type="text" name="fatherLName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" type="text" name="fatherFName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Middle Name:</p>
                <input className="enroll-input-field" type="text" name="fatherMName" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Contact Number:</p>
                <input className="enroll-input-field" type="text" name="fatherContactNo" required />
              </div>
            </div>
            <p className="enroll-sub-text enroll-text-sub">Mother's Name</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" type="text" name="motherLName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" type="text" name="motherFName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Middle Name:</p>
                <input className="enroll-input-field" type="text" name="motherMName" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Contact Number:</p>
                <input className="enroll-input-field" type="text" name="motherContactNo" required />
              </div>
            </div>
            <p className="enroll-sub-text enroll-text-sub">Guardian's Name</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Last Name:</p>
                <input className="enroll-input-field" type="text" name="guardianLName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*First Name:</p>
                <input className="enroll-input-field" type="text" name="guardianFName" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Middle Name:</p>
                <input className="enroll-input-field" type="text" name="guardianMName" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Contact Number:</p>
                <input className="enroll-input-field" type="text" name="guardianContactNo" required />
              </div>
            </div>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Relationship:</p>
                <input className="enroll-input-field" type="text" name="guardianRelationship" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Email:</p>
                <input className="enroll-input-field" type="text" name="guardianEmail"/>
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Occupation:</p>
                <input className="enroll-input-field" type="text" name="guardianOccupation" />
              </div>
            </div>
          </div>

          <div className="enroll-body-div">
            <p className="enroll-body-title">ENROLLMENT INFORMATION</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Preferred Schedule:</p>
                <input className="enroll-input-field" type="text" name="schedule" required />
              </div>
            </div>
          </div>

          <div className="enroll-body-div enroll-etext">
            <p className="enroll-body-title">REQUIREMENTS</p>
            <div className="d-flex justify-content-start enroll-group">
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Student PSA:</p>
                <input className="enroll-input-field" type="text" name="psa" required />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Immunization Card:</p>
                <input className="enroll-input-field" type="text" name="immunizationCard" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">Recent Photo:</p>
                <input className="enroll-input-field" type="text" name="photo" />
              </div>
              <div className="enroll-body-text-input">
                <p className="enroll-sub-text">*Guardian QC ID:</p>
                <input className="enroll-input-field" type="text" name="guardianQCID" required />
              </div>
            </div>
          </div>

          <button className="btn btn-primary" type="submit">Enroll</button>
        </div>
      </form>
    </div>
  );
};

export default EnrollNow;
