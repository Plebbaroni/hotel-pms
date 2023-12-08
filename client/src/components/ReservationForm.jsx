import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import "../css/ReservationForm.css";

function ReservationForm() {
  const history = useHistory();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');
  const [foundRooms, setFoundRooms] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleResClick = async (e) => {

    e.preventDefault();
    if(checkIn!="" || checkOut!="" || adults!="" || children!=""){
      if(adults>0 || children>0){
        const userDataString = sessionStorage.getItem('user');
        const userData = userDataString ? JSON.parse(userDataString) : {};
        if (userData && (userData.role === "Customer" || userData.role === "Admin" || userData.role === "Employee")) {
          // Assuming you have an API endpoint to fetch rooms based on criteria
          try {
            const response = await axios.post('http://localhost:3001/room/search', {
              checkIn,
              checkOut,
              adults,
              children
            });

            // Handle the response, e.g., redirect to a page displaying the available rooms
            console.log(response.data);
            setFoundRooms(response.data);
            history.push('/AvailableRooms', {
              rooms: response.data,
              adults: Number(adults),
              children: Number(children),
              checkIn,
              checkOut,
            });
          } catch (error) {
            console.error(error);
          }
        } else if (userData && (userData.role === "Admin" || userData.role === "Employee")) {
          history.push('/Employee')
        } else {
          history.push('/Login');
        }
      }else{
        alert("Number of Tenants should be greater than 0");
      }
    }else{
      alert("Please fill out all input fields");
    }
  }

  return (
    <div className='transWrapper'>
      <div className='reserveWrapper'>
        <a className='bookARoom'>Book a Room</a>
        <div className='forms'>
          <form action="submit" className='daForm'>
             <input
              type="date"
              name="checkIn"
              placeholder="Check In"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={getCurrentDate()} // Set the minimum date to the current date
              className='dateForm'
            />
            <input
              type="date"
              name="checkOut"
              placeholder="Check Out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn} // Set the minimum date to the selected check-in date
              className='dateForm'
            />
            <input
              type="number"
              name="adults"
              placeholder="No. of Adults"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className='occForm'
            />
            <input
              type="number"
              name="children"
              placeholder="No. of Children"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className='occForm'
            />
          </form>
        </div>
        <button className='resButton' onClick={handleResClick}>Check Reservation</button>
      </div>
    </div>
  );
}

export default ReservationForm;