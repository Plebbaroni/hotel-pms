import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import "../css/EmployeePage.css"
import InventoryOverview from '../components/InventoryOverview.jsx'

function EmployeePage() {
  return (
    <div className='employeePageWrapper'>
      <EmployeeNavbar/>
      <div className='employeePageMain'>
        <EmployeeSidebar/>
        <InventoryOverview/>
      </div>
    </div>
  )
}

export default EmployeePage