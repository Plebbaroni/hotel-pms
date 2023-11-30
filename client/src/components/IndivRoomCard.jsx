import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import axios for making API requests
import '../css/IndivRoomCard.css';

const RoomSquare = ({ roomNumber, roomType, roomStatus, floorNumber, fetchData }) => {
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [occupancyModalOpen, setOccupancyModalOpen] = useState(false);

  const [editedRoomNumber, setEditedRoomNumber] = useState(roomNumber);
  const [editedRoomType, setEditedRoomType] = useState(roomType);
  const [editedFloorNumber, setEditedFloorNumber] = useState(floorNumber);
  const [editedRoomStatus, setEditedRoomStatus] = useState(roomStatus); // State for edited room status
  const [selectedItem, setSelectedItem] = useState(null);
  

  const openViewModal = () => setViewModalOpen(true);
  const closeViewModal = () => setViewModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openOccupancyModal = () => setOccupancyModalOpen(true);
  const closeOccupancyModal = () => setOccupancyModalOpen(false);

  const handleEdit = (roomData) => {
    setSelectedItem(roomData);
    setEditedRoomStatus(roomData.roomStatus); // Set initial edited room status
    setEditedRoomNumber(roomData.roomNumber);
    setEditedRoomType(roomData.roomType);
    setEditedFloorNumber(roomData.floorNumber);
    openEditModal();
  }



  const handleCloseEditModal = () => {
    closeEditModal();
    setSelectedItem(null);
  }

  const handleSaveEdit = async () => {
    try {
      // Assuming you have an API endpoint to update the room details
      await axios.put(`http://localhost:3001/room/updateRoom/${roomNumber}`, {
        room_number: editedRoomNumber,
        room_type: editedRoomType,
        floor_number: editedFloorNumber,
        room_status: editedRoomStatus,
      });
      closeEditModal();
      setSelectedItem(null);
      fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (roomNumber) => {
    try {
      // Assuming you have an API endpoint to delete the room
      await axios.put(`http://localhost:3001/room/deleteRoom/${roomNumber}`);
      fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  }

  const getOccupancyIndicatorColor = () => {
    if (editedRoomStatus === 'Vacant') {
      return 'green';
    } else if (editedRoomStatus === 'Occupied') {
      return 'red';
    } else if (editedRoomStatus === 'Expected Arrival') {
      return 'blue';
    } else if (editedRoomStatus === 'Needs Maintenance') {
      return 'orange';
    }
  };

  const handleOccupancyChange = async () => {
    try {
      // Assuming you have an API endpoint to update the room status
      await axios.put(`http://localhost:3001/room/updateRoom/${roomNumber}`, {
        room_status: editedRoomStatus,
      });
      closeOccupancyModal();
      fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="roomSquare">
      <p className='roomNumber'>{roomNumber}</p>
      {userData.role === "Admin" && (
        <div className='roomCardButtons'>
          <button className="btn btn-sm btn-primary m-2" onClick={openViewModal}>
            View
          </button>
          <button className="btn btn-sm btn-secondary mr-2" onClick={() => handleEdit({ roomNumber, roomType, roomStatus, floorNumber })}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger m-2" onClick={() => handleDelete(roomNumber)}>
            Delete
          </button>
        </div>
      )}
      <div className='occupancyIndicator' onClick={openOccupancyModal} style={{ backgroundColor: getOccupancyIndicatorColor() }}>
        <p className='roomStatus'>{editedRoomStatus}</p>
      </div>

      {/* View Modal */}
      <Modal show={viewModalOpen} onHide={closeViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Room Number: {roomNumber}</p>
          <p>Room Type: {roomType}</p>
          <p>Room Status: {editedRoomStatus}</p>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={editModalOpen} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <form>
            <div className="form-group">
              <label htmlFor="editedRoomNumber">Room Number:</label>
              <input
                type="text"
                className="form-control"
                id="editedRoomNumber"
                value={editedRoomNumber}
                onChange={(e) => setEditedRoomNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedRoomType">Room Type:</label>
              <input
                type="text"
                className="form-control"
                id="editedRoomType"
                value={editedRoomType}
                onChange={(e) => setEditedRoomType(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedFloorNumber">Floor Number:</label>
              <input
                type="text"
                className="form-control"
                id="editedFloorNumber"
                value={editedFloorNumber}
                onChange={(e) => setEditedFloorNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editedRoomStatus">Room Status:</label>
              <select
                className="form-control"
                id="editedRoomStatus"
                value={editedRoomStatus}
                onChange={(e) => setEditedRoomStatus(e.target.value)}
              >
                <option value="Vacant">Vacant</option>
                <option value="Occupied">Occupied</option>
                <option value="Expected Arrival">Expected Arrival</option>
                <option value="Needs Maintenance">Needs Maintenance</option>
              </select>
            </div>
          </form>
          ) : (
            <p>No room selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={occupancyModalOpen} onHide={closeOccupancyModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Occupancy Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="occupancyStatus">Select Occupancy Status:</label>
          <select
            className="form-control"
            id="occupancyStatus"
            value={editedRoomStatus}
            onChange={(e) => setEditedRoomStatus(e.target.value)}
          >
            <option value="Vacant">Vacant</option>
            <option value="Occupied">Occupied</option>
            <option value="Expected Arrival">Expected Arrival</option>
            <option value="Needs Maintenance">Needs Maintenance</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeOccupancyModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOccupancyChange}>
            Confirm Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomSquare;