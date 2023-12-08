import React from 'react'
import {Link} from 'react-router-dom'
import "../css/EmployeeSidebar.css"

function EmployeeSidebar() {
    const userDataString = sessionStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : {};

  return (
    <div className='employeeSidebarWrapper'>
        <Link to="/Employee" className='sidebarThingy'>Occupancy</Link>
        <Link to="/Housekeeping" className='sidebarThingy'>Housekeeping</Link>
        <Link to="/Inventory" className='sidebarThingy'>Inventory</Link>
        <Link to="/Checkout" className='sidebarThingy'>Expected Checkout</Link>
        {userData.role === "Admin" &&  <Link to="/UserList" className='sidebarThingy'>Users</Link>}
        {userData.role === "Admin" &&  <Link to="/AddEntry" className='sidebarThingy'>Add Entry</Link>}
        <Link to="/WalkIn" className='sidebarThingy'>Book Walk In</Link>
    </div>
  )
}

export default EmployeeSidebar