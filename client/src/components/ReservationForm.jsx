import React from 'react'
import { useHistory } from 'react-router-dom';
import "../css/ReservationForm.css"

function ReservationForm() {
  const history = useHistory();

  const handleResClick = async (e) => {
    const userDataString = sessionStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : {};

    console.log(userData)
    if (userData && userData.role === "Customer") {
      history.push('/Reservationpage');
    } else if(userData && (userData.role === "Admin" || userData.role === "Employee")){
      alert("You do not have the necessary perms, bro.");
    }else{
      history.push('/Login');
    }
  }
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
            <button className='resButton' onClick={handleResClick}>Check Reservation</button>
        </div>
    </div>
  )
}

export default ReservationForm