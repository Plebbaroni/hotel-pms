import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/userPage.css';
import '../css/Login.css';

function UserPage() {
  const history = useHistory();
  const [activeBookings, setActiveBookings] = useState([]);
  const [inactiveBookings, setInactiveBookings] = useState([]);
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/booking/getBookingByUser/${userData.id}`);
      const allBookings = response.data;

      const activeBookingsData = allBookings.filter(booking => booking.is_active === 1);
      const inactiveBookingsData = allBookings.filter(booking => booking.is_active === 0);

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

      const userDataStringBeforeLogout = sessionStorage.getItem('user');
      console.log('User data before logout:', userDataStringBeforeLogout);

      if (response.status === 200) {
        console.log('Logout successful');
        sessionStorage.removeItem('user');
        window.location.reload();
        history.push('/login');
      } else {
        console.error('Error logging out:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (bookingId) => {
    setShowConfirmationModal(true);
    setSelectedBookingId(bookingId);
  };

  const confirmDelete = async () => {
    try {
      const bookingId = selectedBookingId;
      // Perform the delete operation using selectedBookingId
      await axios.put(`http://localhost:3001/booking/cancelBooking/${bookingId}`);

      // Close the confirmation modal after successful delete
      setShowConfirmationModal(false);
      // Fetch data again to update the UI
      fetchData();
    } catch (error) {
      alert('Check in is already confirmed!');
      console.error('Error deleting booking:', error);
      // Handle delete failure if needed
    }
  };

  const renderTable = (bookings, tableTitle) => {
    if (bookings.length === 0) {
      return (
        <div>
          <h2>You have no active bookings!</h2>
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.booking_id}>
              <td>{booking.room_type}</td>
              <td>{booking.check_in}</td>
              <td>{booking.check_out}</td>
              <td>{booking.room_rate}</td>
              <td>
                <button className="btn btn-sm btn-danger m-1" onClick={() => handleDelete(booking.booking_id)}>
                  Delete
                </button>
              </td>
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
              {renderTable(activeBookings, 'Active Bookings')}
            </div>
          </div>
          <Link to="/Login" onClick={handleLogout}>
            Log Out
          </Link>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel your booking? 
          <p></p>
          You will not be able to reactivate your booking.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
