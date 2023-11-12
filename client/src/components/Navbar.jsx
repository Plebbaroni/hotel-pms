import React from 'react'
import {Link} from 'react-router-dom'
import "../css/Navbar.css"

function Navbar(){
  return (
    <div className='navbar'>
        <Link to="/"><img src="src/assets/logo.jpeg" alt="" srcset="" className='logoImg'/></Link>
        <div className='links'>
            <a href="" className='navbarLink'>Our Rooms</a>
            <a href="" className='navbarLink'>Amenities</a>
            <a href="" className='navbarLink'>About Us</a>
            <Link to="/Login" className='navbarLink'>Log In</Link>
        </div>
    </div>
  )
}
export default Navbar;