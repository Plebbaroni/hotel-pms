import React from 'react'
import {Link} from 'react-router-dom'
import "../css/EmployeeSidebar.css"

function EmployeeSidebar() {
  return (
    <div className='employeeSidebarWrapper'>
        <Link to="/Employee" className='sidebarThingy'>Occupancy</Link>
        <Link to="/Housekeeping" className='sidebarThingy'>Housekeeping</Link>
        <Link to="/Inventory" className='sidebarThingy'>Inventory</Link>
    </div>
  )
}

export default EmployeeSidebar