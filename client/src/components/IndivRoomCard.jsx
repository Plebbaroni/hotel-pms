import React, { useState } from 'react';
import "../css/IndivRoomCard.css"
const RoomSquare = ({ roomNumber, roomType, roomStatus }) => {

    const userDataString = sessionStorage.getItem('user');
    const userData = userDataString ? JSON.parse(userDataString) : {};

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const getOccupancyIndicatorColor = () => {
    if (roomStatus === 'Vacant') {
      return 'green'; // Set the color for occupied rooms
    } else if (roomStatus === 'Occupied') {
      return 'red'; // Set the color for vacant rooms
    } else if (roomStatus === 'Expected Arrival'){
      return 'blue'; // Set a default color or handle other roomStatus values
    } else if (roomStatus === 'Needs Maintenance'){
        return 'orange';
    }
  };

  return (
    <div className="roomSquare">
      <p className='roomNumber'>{roomNumber}</p>
      { userData.role === "Admin" && (
      <div className='roomCardButtons'>
        <button className="btn btn-sm btn-primary m-2" onClick={openViewModal}>
          View
        </button>
        <button className="btn btn-sm btn-secondary mr-2" onClick={openEditModal}>
          Edit
        </button>
        <button className="btn btn-sm btn-danger m-2">Delete</button>
      </div>
      )}
      <div className='occupancyIndicator'  style={{backgroundColor: getOccupancyIndicatorColor()}}>
            <p className='roomStatus'>{roomStatus}</p>
        </div>
      {/* View Modal */}
      {viewModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeViewModal}>&times;</span>
            <h2>View Room</h2>
            <p>Room Number: {roomNumber}</p>
            <p>Room Type: {roomType}</p>
            <p>Room Status: {roomStatus}</p>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditModal}>&times;</span>
            <h2>Edit Room</h2>
            {/* Add form elements for editing room details */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSquare;