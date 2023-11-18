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
        {userData.role === "Admin" &&  <Link to="/UserList" className='sidebarThingy'>Users</Link>}
        {userData.role === "Admin" &&  <Link to="/AddEntry" className='sidebarThingy'>Add Entry</Link>}
    </div>
  )
}

export default EmployeeSidebar