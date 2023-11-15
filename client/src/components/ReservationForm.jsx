import React from 'react'
import "../css/ReservationForm.css"

function ReservationForm() {
  return (
    <div className='transWrapper'>
        <div className='reserveWrapper'>
            <a className='bookARoom'>Book a Room</a>
            <div className='forms'>
                <form action="submit" className='daForm'>
                  <input type="text" name="checkIn" id=""placeholder="Check In" 
                    onChange={(e) => console.log(e.target.value)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")} 
                    className='dateForm'/>
                   <input type="text" name="checkOut" id=""placeholder="Check Out" 
                    onChange={(e) => console.log(e.target.value)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")} className='dateForm'/>
                  <input type="number" name="adults" placeholder="No. of Adults" className='occForm'/>
                  <input type="number" name="children" placeholder="No. of Children" className='occForm'/>
                  <input type="number" name="rate" placeholder="Preferred Rate" className='rateForm'/>
                </form>
            </div>
            <button className='resButton'>Check Reservation</button>
        </div>
    </div>
  )
}

export default ReservationForm