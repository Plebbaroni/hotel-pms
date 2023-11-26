import React, {useState, setState, useEffect} from 'react'
import axios from 'axios'
import IndivRoomCard from "./IndivRoomCard.jsx"
import "../css/OccupancyOverview.css"

function OccupancyOverview() {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try{
          const response = await axios.get('http://localhost:3001/room/getAllRooms');
          console.log(response);
          setRoomData(response.data);
      }catch(err){
          console.log(err);
      }
  }

  const roomsByFloor = roomData.reduce((acc, room) => {
    const floor = room.floor_number; // Replace 'floor_number' with your actual property name
    acc[floor] = acc[floor] || [];
    acc[floor].push(room);
    return acc;
  }, {});

  return (
    <div className='occupancyWrapper'>
      {Object.entries(roomsByFloor).map(([floor, rooms]) => (
        <div key={floor} className='floorRow'>
          <h1>Floor {floor}</h1>
          <div className='horizontalFloorWrapper'>
            {rooms.map(item => (
              <IndivRoomCard
                key={item.room_number}
                roomNumber={item.room_number}
                roomType={item.room_type}
                roomStatus={item.room_status}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OccupancyOverview