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

  const handleResClick = async (e) => {

    e.preventDefault();

    const userDataString = sessionStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : {};
    if (userData && userData.role === "Customer") {
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
        history.push('/AvailableRooms', { rooms: response.data });
      } catch (error) {
        console.error(error);
      }
    } else if (userData && (userData.role === "Admin" || userData.role === "Employee")) {
      alert("You do not have the necessary permissions.");
    } else {
      history.push('/Login');
    }
  }

  return (
    <div className='transWrapper'>
      <div className='reserveWrapper'>
        <a className='bookARoom'>Book a Room</a>
        <div className='forms'>
          <form action="submit" className='daForm'>
            <input
              type="text"
              name="checkIn"
              placeholder="Check In"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              className='dateForm'
            />
            <input
              type="text"
              name="checkOut"
              placeholder="Check Out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
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