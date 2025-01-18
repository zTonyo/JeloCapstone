import React from 'react';
import mainCDC from '../assets/mainCDC.png'
import teacher from '../assets/default.png'

const Home = () => {
    return (
      <div class="">
        <div class="home-container d-flex justify-content-around">
          <div class="align-self-between">
            <h2 class="custom-bold">Welcome to Bright </h2>
            <h2 class="custom-bold">Futures Child Care</h2>
            <h1 class="custom-bold">SCHOOL </h1>
            <a href="./about" class="see-more-btn">SEE MORE →</a>
          </div>
          <div>
            <img src={mainCDC} alt="mainCDC"/>
          </div>
        </div>
    
        <div class="about-section">
          <h3>ABOUT SCHOOL</h3>
          <p>Our school is dedicated to providing a safe, nurturing, and engaging environment where children can explore their potential, develop essential skills, and build a strong foundation for lifelong learning and success.</p>
            <div class="mission-vision justify-content-around">
              <div class="p-2">
                <h3>MISSION</h3>
                <div class="card">
                  <p1>Our school is dedicated to providing a safe, nurturing, and engaging environment where children can explore their potential, develop essential skills, and build a strong foundation for lifelong learning and success.</p1>
                </div>
              </div>
              <div class="p-2">
                <h3>VISION</h3>
                <div class="card">
                  <p1>Our school is dedicated to providing a safe, nurturing, and engaging environment where children can explore their potential, develop essential skills, and build a strong foundation for lifelong learning and success.</p1>
                </div>
              </div>
            </div>
          <a href="/" class="read-more-btn">READ MORE →</a>
        </div>
    
        <div class="teachers-section">
          <h3>OUR TEACHERS</h3>
          <p1>Our teachers are passionate and highly qualified, dedicated to helping each child grow and succeed. They create a supportive environment that encourages curiosity, creativity, and a lifelong love of learning.</p1>
            <div class="teachers-images">
              <div>
                <div class="card">
                  <a href="/"><img src={teacher} alt="Teacher Charmaine"/></a>
                  <p1>Charmaine</p1>
                </div>
              </div>
              <div>
                <div class="card">
                  <a href="/"><img src={teacher} alt="Teacher Charmaine"/></a>
                  <p1>Charmaine</p1>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
};

export default Home;