import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    localStorage.setItem("isLoggedIn", "false");
  }, []);

  return <h1>Hello</h1>;
};

export default About;
