import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import RoomCard from "../components/RoomCard.jsx"
import '../css/RoomCard.css'
import '../css/RoomsList.css'

function AvailableRooms() {
  const location = useLocation();
  const { rooms } = location.state;

  return (
    <div className='roomsListBg'>
        <div className='roomsListWrapper'>
            <a className='ourRooms '>Rooms Found</a>
            <div className='roomListDiv'>
                <center>
                    {rooms.map(item => (
                       <Link key={item.room_type} to="/Reservationpage" state={{room_type: item.room_type}} className="cardLink">
                            <RoomCard key={item.room_type} TypeRoom={item.room_type} DescriptionRoom={item.room_description} RoomOccMin={item.min_number_of_occupants} RoomOccMax={item.max_number_of_occupants} />
                        </Link>
                    ))}
                </center>
            </div>
        </div>
    </div>
  )
}

export default AvailableRooms;