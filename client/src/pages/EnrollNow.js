import React, { useEffect } from "react";

const EnrollNow = () => {
  useEffect(() => {
    localStorage.setItem("isLoggedIn", "false");
  }, []);

  return (
    <div>
      
    </div>
  )
};

export default EnrollNow;
