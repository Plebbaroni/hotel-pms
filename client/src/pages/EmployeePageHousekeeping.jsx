import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import "../css/EmployeePage.css"
import HousekeepingOverview from '../components/HousekeepingOverview.jsx'

function EmployeePage() {
  return (
    <div className='employeePageWrapper'>
      <EmployeeNavbar/>
      <div className='employeePageMain'>
        <EmployeeSidebar/>
        <div className='floorcontent'>
          <h1>Maintain Me Pls</h1>
          <HousekeepingOverview/>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage