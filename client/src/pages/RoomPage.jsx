import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import "../css/RoomPage.css"

function RoomPage(props) {
  const [roomData, setRoomData] = useState({});
  const params = useParams(props);
  console.log(params);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/room/getRoomData/${params.roomType}`)
      .then((response) => {
        console.log('Response Data:', response.data);
        setRoomData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
        // Handle errors or update state accordingly
      });
  }, [params.roomType]);

  return (
    <div className='RoomPage'>
    <div className='RoomImage'>
      <center>
        <img src="" alt="" width={"90%"} height={"500"}/>
        <br />
        {Object.keys(roomData).length > 0 ? (
          <>
            <p>{roomData.min_number_of_occupants || "N/A"}</p>
            <p>{roomData.max_number_of_occupants || "N/A"}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button>Book Now</button>
      </center>
    </div>
    <div className='RoomDescription'>
      <center>
          <h1>{params.roomType}</h1>
          <hr style={{width: `90%`}}/>
          {Object.keys(roomData).length > 0 ? (
          <>
            <p>{roomData.room_description || "N/A"}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </center>
    </div>
  </div>
  )
}

export default RoomPage