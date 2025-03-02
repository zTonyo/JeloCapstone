import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function GuardianRequirements({ sidebarOpen }) {
  const [requirements, setRequirements] = useState([
    {
      psa: "Testing",
      immunizationCard: "Testing",
	    recentPhoto: "Testing",
	    guardianQCID: "Testing",
    }
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedInGuardian = localStorage.getItem("isLoggedInGuardian");

    if (isLoggedInGuardian === "false") {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <div className={`admin-body ${sidebarOpen ? 'without-sidebar' : 'with-sidebar'}`}>
        <h2>Requirements</h2>
        <div className='guardian-requirement-container'>
          <h4>PSA</h4>          
          <p className='d-flex justify-content-center'>{requirements[0].psa}</p>
          <h4>Immunization Card</h4>
          <p className='d-flex justify-content-center'>{requirements[0].immunizationCard}</p>
          <h4>Guardian Quezon City I.D.</h4>
          <p className='d-flex justify-content-center'>{requirements[0].guardianQCID}</p>
        </div>
      </div>
    </div>
  );
}

export default GuardianRequirements;