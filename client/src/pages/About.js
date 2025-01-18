import React, { useEffect } from "react";

const About = () => {
    useEffect(() => {
        // Set the 'isLoggedIn' key in localStorage to false
        localStorage.setItem("isLoggedIn", "false");
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    return <h1>Hello</h1>;
};

export default About;
