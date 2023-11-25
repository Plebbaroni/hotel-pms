import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import "../css/EmployeeNavbar.css"
import axios from 'axios'

function EmployeeNavbar() {
  const history = useHistory();
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/logout', null, {
        withCredentials: true,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });

      if (response.status === 200) {
        // Logout successful
        history.push('/login'); // Redirect to login page or any other route after logout
        sessionStorage.removeItem('user');
        const userDataString = sessionStorage.getItem('user');
        console.log(userDataString);
      } else {
        console.error('Error logging out:', response.statusText);
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  }  
  return (
    <div className='employeeNavbar'> 
        <Link to="/Login" onClick={handleLogout}>
        Log Out
      </Link>
    </div>
  )
}

export default EmployeeNavbar