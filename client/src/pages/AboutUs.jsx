import React from 'react'
import "../css/Aboutus.css"

function AboutUs() {
    return (
      <div className='wrapper'>
              <div className='transWrapper'>
                <div className='AboutUsWrapper'>
                  <div className='header'>
                    <h1>About Us</h1>
                  </div>
                  <div className='profile-box'>
                      <div className='profile'>
                        <img src='../src/assets/jared.jpg' className='profile-img'></img>
                        <h5>Jared Schulz</h5>
                        <h6>Student</h6>
                        <h6>BS CS 2</h6>
                      </div>
                      <div className='profile'>
                        <img src='../src/assets/angelo.png' className='profile-img'></img>
                        <h5>Angelo Pumar</h5>
                        <h6>Student</h6>
                        <h6>BS CS 2</h6>
                      </div>
                      <div className='profile'>
                        <img src='../src/assets/marlex.jpg' className='profile-img'></img>
                        <h5>Marlex Manalili</h5>
                        <h6>Student</h6>
                        <h6>BS CS 2</h6>
                      </div>
                      <div className='profile'>
                        <img src='../src/assets/sean.jpg' className='profile-img'></img>
                        <h5>Sean Duran</h5>
                        <h6>Student</h6>
                        <h6>BS CS 2</h6>
                      </div>
                  </div>
                </div>
              </div> 
      </div>
      )
}

export default AboutUs