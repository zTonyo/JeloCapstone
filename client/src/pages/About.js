import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = ({ onLogout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    onLogout();
  }, [onLogout, navigate]);

  return <h1>Hello</h1>;
};

export default About;
