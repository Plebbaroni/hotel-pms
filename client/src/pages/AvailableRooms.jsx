import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import BookingRoomCard from '../components/BookingRoomCard.jsx';
import '../css/RoomCard.css';
import '../css/RoomsList.css';

function AvailableRooms() {
  const history = useHistory();
  const location = useLocation();
  const { rooms, adults, children, checkIn, checkOut } = location.state;
  const [totalRooms, setTotalRooms] = useState({});
  const [totalPeople, setTotalPeople] = useState(adults + children);
  const [confirmClicked, setConfirmClicked] = useState(false);

  const handleConfirmClick = () => {
    setTotalPeople(adults + children);
    
    const totalCount = Object.values(totalRooms).reduce((acc, count) => acc + count, 0);
  
    if (totalCount <= totalPeople && totalCount > 0) {
      history.push('/Reservationpage',  {totalRooms, checkIn, checkOut, adults, children} );
    } else {
      if(totalCount > totalPeople){
        alert('Total number of rooms exceeds total number of people');
      }else if(totalCount === 0){
        alert('Please choose a room.') 
      }
      setConfirmClicked(false);
    }
  };

  const handleRoomCountChange = (roomType, count) => {
    setTotalRooms((prevTotalRooms) => ({
      ...prevTotalRooms,
      [roomType]: count,
    }));
  };

  return (
    <div className='roomsListBg'>
      <div className='roomsListWrapper'>
        <center>
          <p className='ourRooms'>Rooms Found</p>
        </center>
        <div className='roomListDiv'>
            {rooms.map((item) => (
              <div key={item.room_type} state={{ room_type: item.room_type }} className='cardLink2'>
                <BookingRoomCard
                  key={item.room_type}
                  TypeRoom={item.room_type}
                  DescriptionRoom={item.room_description}
                  RoomOccMin={item.min_number_of_occupants}
                  RoomOccMax={item.max_number_of_occupants}
                  onRoomCountChange={handleRoomCountChange}
                />
              </div>
            ))}
        </div>
        <center>
          <button className='confirmRoomsButton' onClick={handleConfirmClick}>
            Confirm Rooms
          </button>
        </center>
      </div>
    </div>
  );
}

export default AvailableRooms;