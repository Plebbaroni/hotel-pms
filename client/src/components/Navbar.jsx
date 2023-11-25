import React from 'react'
import {Link} from 'react-router-dom'
import "../css/Navbar.css"

function Navbar(){
  return (
    <div className='customnavbar'>
        <Link to="/"><img src="src/assets/logo.jpeg" alt="" srcset="" className='logoImg'/></Link>
        <div className='links'>
        <Link to="/RoomsList" className='navbarLink'>Our Rooms</Link>
        <Link to="/Amenities" className='navbarLink'>Amenities</Link>
        <Link to="/AboutUs" className='navbarLink'>About Us</Link>
            <Link to="/Login" className='navbarLink'>Log In</Link>
        </div>
    </div>
  )
}
export default Navbar;