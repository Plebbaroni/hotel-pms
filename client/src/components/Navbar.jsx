import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};

  // Check if the user is logged in based on the presence of user data
  const isLoggedIn = !!userData.username;

  return (
    <div className='customnavbar'>
      <Link to='/'>
        <img src='src/assets/logo.jpeg' alt='' className='logoImg' />
      </Link>
      <div className='links'>
        <Link to='/RoomsList' className='navbarLink'>
          Our Rooms
        </Link>
        <Link to='/Amenities' className='navbarLink'>
          Amenities
        </Link>
        <Link to='/AboutUs' className='navbarLink'>
          About Us
        </Link>

        {isLoggedIn ? (
          // Show user profile and popup
          <Link to='/UserPage' className='navbarLink'>
            {userData.username}
          </Link>
        ) : (
          // Show login link
          <Link to='/Login' className='navbarLink'>
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;