import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IndivRoomCard from './IndivRoomCard.jsx';
import '../css/OccupancyOverview.css';

function OccupancyOverview() {
  const [roomData, setRoomData] = useState([]);
  
    const [triggerUpdate, setTriggerUpdate] = useState(0); // New state for triggering update
  
    useEffect(() => {
      const fetchDataAndRooms = async () => {
        try {
          // Wait for all promises to resolve using Promise.all
          await Promise.all([
            autoCheckOut(),
            getOccupiedRooms(),
            getExpectedRooms(),
            getVacantRooms(),
            fetchData(),
          ]);
    
          // Now that all asynchronous operations are done, you can update the state
          // or perform any other actions that depend on the fetched data.
          setTriggerUpdate(prevValue => prevValue + 1);
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchDataAndRooms();
    }, []); // Empty dependency array to run only once on mount

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/room/getAllRooms');
      setRoomData([...response.data]); // Create a new array
    } catch (err) {
      console.log(err);
    }
  };

  const autoCheckOut = async () => {
    try {
      await axios.put('http://localhost:3001/room/autoCheckOut');
    } catch (err) {
      console.log(err);
    }
  }

  const getExpectedRooms = async () => {
    try {
      await axios.put('http://localhost:3001/room/getExpectedRooms');
    } catch (err) {
      console.log(err);
    }
  };

  const getOccupiedRooms = async () => {
    try {
      await axios.put('http://localhost:3001/room/getOccupiedRooms');
    } catch (err) {
      console.log(err);
    }
  };

  const getVacantRooms = async () => {
    try {
      await axios.put('http://localhost:3001/room/getVacantRooms');
    } catch (err) {
      console.log(err);
    }
  }

  const roomsByFloor = roomData.reduce((acc, room) => {
    const floor = room.floor_number; // Replace 'floor_number' with your actual property name
    acc[floor] = acc[floor] || [];
    acc[floor].push(room);
    return acc;
  }, {});

  const updateOccupancyOverview = async () => {
    await fetchData();
    setTriggerUpdate(prevValue => prevValue + 1);
    window.location.reload();
  };


  return (
    <div className="occupancyWrapper">
      {Object.entries(roomsByFloor).map(([floor, rooms]) => (
        <div className="floorDiv" key={floor}>
          <h2 className="floorHeader">Floor {floor}</h2>
          <div key={floor} className="horizontalFloorWrapper">
            {rooms.map((item) => (
              <IndivRoomCard
                key={item.room_number}
                roomNumber={item.room_number}
                roomType={item.room_type}
                roomStatus={item.room_status}
                floorNumber={floor}
                fetchData={fetchData}
                updateOccupancyOverview={updateOccupancyOverview}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OccupancyOverview;