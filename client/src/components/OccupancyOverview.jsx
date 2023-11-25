import React, {useState, setState, useEffect} from 'react'
import axios from 'axios'

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

  return (
    <div>
      {roomData.map(item => (
        <div key={item.room_number}>
          {item.room_number}
          {item.room_type}
          {item.room_status}
        </div>
      ))}
    </div>
  )
}

export default OccupancyOverview