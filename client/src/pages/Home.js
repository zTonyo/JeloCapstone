import React, { useEffect } from 'react';
import mainCDC from '../assets/mainCDC.png'
import teacher from '../assets/default.png'

const Home = () => {
  useEffect(() => {
   localStorage.setItem("isLoggedIn", "false");
   localStorage.setItem("isLoggedInGuardian", "false");
  }, []);

    return (
      <div className="">
        <div className="home-container d-flex justify-content-around">
          <div className="align-self-between">
            <h2 className="custom-bold">Welcome to Bright </h2>
            <h2 className="custom-bold">Futures Child Care</h2>
            <h1 className="custom-bold">SCHOOL </h1>
            <a href="./about" className="see-more-btn">SEE MORE →</a>
          </div>
          <div>
            <img src={mainCDC} alt="mainCDC"/>
          </div>
        </div>
    
        <div className="about-section">
          <h3>ABOUT SCHOOL</h3>
          <p>Our school is dedicated to providing a safe, nurturing, and engaging environment where children can explore their potential, develop essential skills, and build a strong foundation for lifelong learning and success.</p>
            <div className="mission-vision justify-content-around">
              <div className="p-2">
                <h3>MISSION</h3>
                <div className="card">
                  <p>Our school is dedicated to providing a safe, nurturing, and engaging environment where children can explore their potential, develop essential skills, and build a strong foundation for lifelong learning and success.</p>
                </div>
              </div>
              <div className="p-2">
                <h3>VISION</h3>
                <div className="card">
                  <p>Our school is dedicated to providing a safe, nurturing, and engaging environment where children can explore their potential, develop essential skills, and build a strong foundation for lifelong learning and success.</p>
                </div>
              </div>
            </div>
          <a href="/" className="read-more-btn">READ MORE →</a>
        </div>
    
        <div className="teachers-section">
          <h3>OUR TEACHERS</h3>
          <p>Our teachers are passionate and highly qualified, dedicated to helping each child grow and succeed. They create a supportive environment that encourages curiosity, creativity, and a lifelong love of learning.</p>
            <div className="teachers-images">
              <div>
                <div className="card">
                  <a href="/"><img src={teacher} alt="Teacher Charmaine"/></a>
                  <p>Charmaine</p>
                </div>
              </div>
              <div>
                <div className="card">
                  <a href="/"><img src={teacher} alt="Teacher Charmaine"/></a>
                  <p>Charmaine</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
};

export default Home;