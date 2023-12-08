import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import "../css/EmployeePage.css"
import CheckOutOverview from '../components/CheckOutOverview.jsx'

function EmployeePage() {
  return (
    <div className='employeePageWrapper'>
      <EmployeeNavbar/>
      <div className='employeePageMain'>
        <EmployeeSidebar/>
        <div className='floorcontent'>
            <h1>Check Out</h1>
            <CheckOutOverview/>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage