import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import "../css/EmployeeNavbar.css"
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function EmployeeNavbar() {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/logout', null, {
        withCredentials: true,
      });
  
      // Log user data before removal
      const userDataStringBeforeLogout = sessionStorage.getItem('user');
      console.log('User data before logout:', userDataStringBeforeLogout);
  
      if (response.status === 200) {
        console.log('Logout successful');
  
        // Remove user data from sessionStorage
        sessionStorage.removeItem('user');
  
        // Refresh the page to reflect the logout state
        window.location.reload();
  
        // Redirect to login page or any other route after logout
        history.push('/login');
      } else {
        console.error('Error logging out:', response.statusText);
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };
  

  return (
    <div className='employeeNavbar'> 
        <Link to={{}}><img src="src/assets/logo.jpeg" alt="" srcset="" className='logoImg'/></Link>
        <div className='employeeLogout'>
          <Link to="/Login" className='employeelogbutton' onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> Log Out
          </Link>
        </div>
    </div>
  )
}

export default EmployeeNavbar