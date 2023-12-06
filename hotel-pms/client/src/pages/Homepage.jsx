import React from 'react'
import ReservationForm from "../components/ReservationForm"
import "../css/Homepage.css"
function Homepage() {
  return (
    <div className='homePage'>
        <div className='homePageBody'>
          <ReservationForm/>
        </div>
    </div>
  )
}

export default Homepage