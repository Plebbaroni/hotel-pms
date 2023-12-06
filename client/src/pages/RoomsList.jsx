import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RoomCard from "../components/RoomCard.jsx"
import '../css/RoomCard.css'
import '../css/RoomsList.css'
function RoomsList() {

    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Fetches the room data from the backend
    const fetchData = async () => {
        try{
            const response = await axios.get('http://localhost:3001/room/roomdata');
            console.log(response);
            setRoomData(response.data);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='roomsListBg'>
        <div className='roomsListWrapper'>
            <a className='ourRooms '>Our Rooms</a>
            <div className='roomListDiv'>
                <center>
                    {roomData.map(item => (
                       <Link key={item.room_type} to={`/room/${item.room_type}`} state={{room_type: item.room_type}} className="cardLink">
                            <RoomCard key={item.room_type} TypeRoom={item.room_type} DescriptionRoom={item.room_description} RoomOccMin={item.min_number_of_occupants} RoomOccMax={item.max_number_of_occupants} />
                        </Link>
                    ))}
                </center>
            </div>
        </div>
    </div>
  )
}

export default RoomsList