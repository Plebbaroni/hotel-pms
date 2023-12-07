import React from 'react'
import EmployeeNavbar from '../components/EmployeeNavbar'
import Homepage from './Homepage'
import '../css/WalkIn.css'

function WalkIn() {
  return (
    <div className='Joey'>
        <EmployeeNavbar/>
        <Homepage/>
    </div>
  )
}

export default WalkIn