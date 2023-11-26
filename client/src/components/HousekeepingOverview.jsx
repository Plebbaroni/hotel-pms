import React, {useState, useEffect} from 'react'
import axios from 'axios'
import IndivRoomCard from "./IndivRoomCard.jsx"
function HousekeepingOverview() {

  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try{
          const response = await axios.get('http://localhost:3001/room/getHousekeeping');
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
    <div>
      {Object.entries(roomsByFloor).map(([floor, rooms]) => (
        <div key={floor}>
          <h2> Floor {floor}</h2>
              {rooms.map(item => (
                <IndivRoomCard
                key={item.room_number}
                roomNumber={item.room_number}
                roomType={item.room_type}
                roomStatus={item.room_status}
              />
              ))}
        </div>
      ))}
    </div>
  );
}

export default HousekeepingOverview