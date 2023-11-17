import React from 'react'
import {useParams} from 'react-router-dom'

function RoomPage({RoomType, RoomDescription}) {
  const params = useParams();
  


  return (
    <div>{params.RoomType}</div>
  )
}

export default RoomPage