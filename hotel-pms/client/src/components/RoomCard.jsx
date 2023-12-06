import React from 'react'
import {Link} from 'react-router-dom'

function RoomCard({TypeRoom, DescriptionRoom, RoomOccMin, RoomOccMax}) {
  return (
      <div className='roomCard'>
          <div className='roomCardImgDiv'>
              <img src="" alt="" width={"250px"} height={"120px"}/>
          </div>
          <div className='roomCardText'>
              <h1>{TypeRoom}</h1>
              <p>Min Occ: {RoomOccMin} | Max Occ: {RoomOccMax}</p>
          </div>
      </div>
  )
}

export default RoomCard