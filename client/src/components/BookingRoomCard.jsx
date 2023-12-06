import React, { useState } from 'react';

function BookingRoomCard({ TypeRoom, DescriptionRoom, RoomOccMin, RoomOccMax, onRoomCountChange }) {
  const [roomCount, setRoomCount] = useState(0);

  const handleIncrement = () => {
    setRoomCount(roomCount + 1);
    onRoomCountChange(TypeRoom, roomCount + 1); // Notify the parent component
  };

  const handleDecrement = () => {
    if (roomCount > 0) {
      setRoomCount(roomCount - 1);
      onRoomCountChange(TypeRoom, roomCount - 1); // Notify the parent component
    }
  };

  return (
    <div className='roomCard'>
      <div className='roomCardImgDiv'>
        <img src="" alt="" width={"250px"} height={"120px"} />
      </div>
      <div className='roomCardText'>
        <h1>{TypeRoom}</h1>
        <p>Min Occ: {RoomOccMin} | Max Occ: {RoomOccMax}</p>
        <div className='roomCounter'>
          <button onClick={handleDecrement}>-</button>
          <span>{roomCount}</span>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </div>
  );
}

export default BookingRoomCard;