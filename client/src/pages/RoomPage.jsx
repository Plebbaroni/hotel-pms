import React from 'react'
import {useParams} from 'react-router-dom'

function RoomPage({RoomType, RoomDescription}) {
  const params = useParams();
  console.log(params)


  return (
    <div>{params.RoomType}</div>
  )
}

export default RoomPage