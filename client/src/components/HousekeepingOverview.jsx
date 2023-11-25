import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
          <h2>Floor {floor}</h2>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Room Number</th>
                <th>Room Type</th>
                <th>Room Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(item => (
                <tr key={item.room_number}>
                  <td>{item.room_number}</td>
                  <td>{item.room_type}</td>
                  <td>{item.room_status}</td>
                  <td>
                    <button className="btn btn-sm btn-primary m1-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-secondary mr-2" >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger m1-2">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default HousekeepingOverview