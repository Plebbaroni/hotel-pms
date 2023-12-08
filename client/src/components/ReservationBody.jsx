import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

function Body() {
  const history = useHistory();
  const location = useLocation();
  const roomTypes = location.state.totalRooms;
  const children = location.state.children;
  const adults = location.state.adults
  const checkIn = location.state.checkIn;
  const checkOut = location.state.checkOut;
  const [bookRooms, setBookRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
  });

  // Update form data on input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const availableRooms = await getAvailableRooms(roomTypes, checkIn, checkOut);
        console.log('Available Rooms:', availableRooms);

        // Set bookRooms state with the available rooms
        setBookRooms(availableRooms);

        // Calculate the number of nights
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const timeDifference = checkOutDate - checkInDate;
        const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        console.log(userData.id)
        // Set the numberOfNights state
        setNumberOfNights(nights);
      } catch (error) {
        console.error('Error fetching available rooms:', error);
      }
    };

    fetchData();
  }, [roomTypes, checkIn, checkOut]);

  useEffect(() => {
    // Calculate total price based on room rate and quantity for each room type
    const totalPriceForAllRooms = bookRooms.reduce((total, roomType) => {
      const totalForRoomType = roomType.reduce((sum, room) => sum + room.room_rate, 0);
      return total + totalForRoomType;
    }, 0);

    // Check if numberOfNights is defined
    if (numberOfNights !== undefined) {
      const totalPrice = totalPriceForAllRooms * numberOfNights;
      // Set the total price state
      setTotalPrice(totalPrice);
    }
  }, [bookRooms, numberOfNights]);

  useEffect(() => {
    console.log('Updated bookRooms:', bookRooms);
  }, [bookRooms]);

  function returnHome() {
    history.push('/');
  }

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      // Iterate through each room type in bookRooms
      for (const roomType of bookRooms) {
        // Iterate through each room in the current room type
        for (const room of roomType) {
          // Prepare data for the booking
          const bookingData = {
            room_number: room.room_number,
            number_of_guests_adult: adults,
            number_of_guests_children: children,
            check_in_date: checkIn,
            check_out_date: checkOut,
            user_id: userData.id, // Replace with the actual user_id from your data source
            country: formData.country, // Replace with the actual country value
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phoneNumber,
          };
          console.log(bookingData)
          // Make the Axios call to create the booking
          const response = await axios.post('http://localhost:3001/booking/createBooking', bookingData);
          console.log('Booking created:', response.data);
        }
      }

      // After creating all bookings, return to the home page
      if(userData.role === "Customer"){
        returnHome();
      }else if(userData.role === "Admin" || userData.role === "Employee"){
        history.push("/Employee");
      }
    } catch (error) {
      console.error('Error creating bookings:', error);
    }
  };

  const getAvailableRooms = async (roomTypes, checkIn, checkOut) => {
    try {
      const roomPromises = Object.entries(roomTypes).map(([type, quantity]) => {
        // For each room type, call the API and pass the quantity, checkIn, and checkOut
        return axios.get(`http://localhost:3001/room/getAvailableRooms/${type}/${quantity}/${checkIn}/${checkOut}`);
      });

      // Wait for all room requests to complete
      const roomResponses = await Promise.all(roomPromises);

      // Extract data from responses
      const availableRooms = roomResponses.map((response) => response.data);

      return availableRooms;
    } catch (error) {
      console.error('Error fetching available rooms:', error);
      throw error;
    }
  };

  return (
    <div>
      <center>
        <div className="Title">
          <h1>Your Reservation</h1>
          <a href="">
            <button onClick={returnHome}>X</button>
          </a>
        </div>
        <div className="Form">
          <div className="ReserveBox">
            <div className="Personal">
               <h1>Personal Information</h1>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <br />
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />
            </div>
          </div>
          <div className="ReserveBox">
            <div>
              <h1>Payment Information</h1>
            </div>
          </div>
          <div className="ReserveBox">
            <div>
              <h1>Price Summary</h1>
              <div>
                {bookRooms.map((roomType, index) => (
                  <div key={index}>
                    {roomType.map((room, roomIndex) => (
                      <div key={roomIndex}>
                        <p>Room Type: {room.room_type}</p>
                        <p>Room Rate: {room.room_rate} X {numberOfNights}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                ))}
                <p>Total Price: {totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="ButtonDiv">
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Body;