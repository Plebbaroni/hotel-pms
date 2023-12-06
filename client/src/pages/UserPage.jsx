import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/userPage.css'
import '../css/Login.css';

function UserPage() {

  const history = useHistory();
  const [activeBookings, setActiveBookings] = useState([]);
  const [inactiveBookings, setInactiveBookings] = useState([]);
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/booking/getBookingByUser/${userData.id}`);
      const allBookings = response.data;

      // Separate active and inactive bookings
      const activeBookingsData = allBookings.filter(booking => booking.is_active === 1);
      const inactiveBookingsData = allBookings.filter(booking => booking.is_active === 0);
      console.log(response.data);
      setActiveBookings(activeBookingsData);
      setInactiveBookings(inactiveBookingsData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3001/user/logout', null, {
        withCredentials: true,
      });
  
      // Log user data before removal
      const userDataStringBeforeLogout = sessionStorage.getItem('user');
      console.log('User data before logout:', userDataStringBeforeLogout);
  
      if (response.status === 200) {
        console.log('Logout successful');
  
        // Remove user data from sessionStorage
        sessionStorage.removeItem('user');
  
        // Refresh the page to reflect the logout state
        window.location.reload();
  
        // Redirect to login page or any other route after logout
        history.push('/login');
      } else {
        console.error('Error logging out:', response.statusText);
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle unexpected errors
    }
  };

  // Table for the list of bookings
  const renderTable = (bookings, tableTitle) => {
    if (bookings.length === 0) {
      return (
        <div>
          <h2>Bookings Empty</h2>
        </div>
      );
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Check In Date</th>
            <th>Check Out Date</th>
            <th>Room Rate</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.room_type}</td>
              <td>{booking.check_in}</td>
              <td>{booking.check_out}</td>
              <td>{booking.room_rate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div className='wrapper'>
      <div className='transWrapper'>
        <div className='userWrapper'>
          <h1>Your Bookings</h1>
          <div className='Bookings'>
            <div className='activeBookings'>
              <h1>Active Bookings</h1>
              {renderTable(activeBookings, 'Active Bookings')}
            </div>
            <div className='inactiveBookings'>
              <h1>Inactive Bookings</h1>
              {renderTable(inactiveBookings, 'Inactive Bookings')}
            </div>
          </div>
          <Link to="/Login" onClick={handleLogout}>
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
