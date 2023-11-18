import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import "../css/EmployeePage.css"
import OccupancyOverview from '../components/OccupancyOverview.jsx'

function EmployeePage() {
  return (
    <div className='employeePageWrapper'>
      <EmployeeNavbar/>
      <div className='employeePageMain'>
        <EmployeeSidebar/>
        <OccupancyOverview/>
      </div>
    </div>
  )
}

export default EmployeePage