import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar.jsx'
import EmployeeSidebar from '../components/EmployeeSidebar.jsx'
import "../css/EmployeePage.css"
import UserListComp from '../components/UserListComp.jsx'

// Displays all the users
function UserList() {
  return (
    <div className='employeePageWrapper'>
      <EmployeeNavbar/>
      <div className='employeePageMain'>
        <EmployeeSidebar/>
        <div className='pagecontent'>
          <h1>UserList</h1>
            <UserListComp/>
        </div>
      </div>
    </div>
  )
}

export default UserList