import React, {useState, useEffect} from 'react'
import axios from 'axios'
import RoomCard from "../components/RoomCard.jsx"
import '../css/RoomCard.css'
import '../css/RoomsList.css'
function RoomsList() {

    const [roomData, setRoomData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await axios.get('http://localhost:3001/roomdata');
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
                        <RoomCard key={item.room_type} TypeRoom={item.room_type} DescriptionRoom={item.room_description} RoomOccMin={item.min_number_of_occupants} RoomOccMax={item.max_number_of_occupants} />
                    ))}
                </center>
            </div>
        </div>
    </div>
  )
}

export default RoomsList