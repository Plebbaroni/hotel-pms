import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import "../css/EmployeePage.css"
import OccupancyOverview from '../components/OccupancyOverview.jsx'

function EmployeePage() {
  function getCurrentDate(separator=''){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

  return (
    <div className='employeePageWrapper'>
      <EmployeeNavbar/>
      <div className='employeePageMain'>
        <EmployeeSidebar/>
        <div className='floorcontent'>
          <h1>{getCurrentDate('/')}</h1>
          <OccupancyOverview/>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage