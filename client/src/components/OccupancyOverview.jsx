import React, {useState, setState, useEffect} from 'react'
import axios from 'axios'
import IndivRoomCard from "./IndivRoomCard.jsx"
import "../css/OccupancyOverview.css"

function OccupancyOverview() {
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
      getOccupiedRooms();
      getExpectedRooms();
      fetchData();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = async () => {
      try{
          const response = await axios.get('http://localhost:3001/room/getAllRooms');
          console.log(response);
          setRoomData(response.data);
      }catch(err){
          console.log(err);
      }
  }

  const getExpectedRooms = async () => {
    try{
      await axios.put(`http://localhost:3001/room/getExpectedRooms`)
    }catch(err){
      console.log(err)
    }
  }

  const getOccupiedRooms = async () => {
    try{
      await axios.put(`http://localhost:3001/room/getOccupiedRooms`)
    }catch(err){
      console.log(err)
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
        <div className='floorDiv' key={floor}>
        <h1 className='floorHeader'>Floor {floor}</h1>
        <div key={floor} className='horizontalFloorWrapper'>
              {rooms.map(item => (
                  <IndivRoomCard
                  key={item.room_number}
                  roomNumber={item.room_number}
                  roomType={item.room_type}
                  roomStatus={item.room_status}
                  floorNumber = {floor}
                  fetchData = {fetchData}
                />
                ))}
        </div>
      </div>
      ))}
    </div>
  );
}

export default OccupancyOverview