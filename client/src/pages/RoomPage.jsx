import React from 'react'
import {useParams} from 'react-router-dom'
import "../css/RoomPage.css"

function RoomPage(props) {
  const params = useParams(props);
  console.log(params);
  
  return (
    <div className='RoomPage'>
      <div className='RoomImage'>
        <center>
          <img src="" alt="" width={"90%"} height={"500"}/>
          <br />
          <p>Size of Occupancy, Amount of Beds, Amenities</p>
          <button>Book Now</button>
        </center>
      </div>
      <div className='RoomDescription'>
        <center>
            <h1>{params.roomType}</h1>
            <hr style={{width: `90%`}}/>
            <p>desct</p>
        </center>
      </div>
    </div>
  )
}

export default RoomPage