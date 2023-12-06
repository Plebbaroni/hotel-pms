import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'; // Import axios for making API requests
import '../css/IndivRoomCard.css';

const RoomSquare = ({ roomNumber, roomType, roomStatus, floorNumber, fetchData, updateOccupancyOverview }) => {
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [occupancyModalOpen, setOccupancyModalOpen] = useState(false);
  const [associatedBooking, setAssociatedBooking] = useState(null);
  const [currentTenant, setCurrentTenant] = useState(null)
;  const [editedRoomNumber, setEditedRoomNumber] = useState(roomNumber);
  const [editedRoomType, setEditedRoomType] = useState(roomType);
  const [editedFloorNumber, setEditedFloorNumber] = useState(floorNumber);
  const [editedRoomStatus, setEditedRoomStatus] = useState(roomStatus); // State for edited room status
  const [selectedItem, setSelectedItem] = useState(null);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
  const [quantityCounter, setQuantityCounter] = useState(1);
  const [inventoryItems, setInventoryItems] = useState([]);

  const openAddItemModal = () => {
    setAddItemModalOpen(true);
    closeViewModal();
    retrieveInventoryItems();
  }

  const cancelAddItem = () => {
    closeAddItemModal();
    openViewModal();
  }

  const closeAddItemModal = () => setAddItemModalOpen(false);

  const retrieveInventoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/inventory/getAllItems');
      console.log(response);
      setInventoryItems(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const handleItemSelection = (inventoryItem) => {
    setSelectedInventoryItem(inventoryItem);
  };

  const handleQuantityChange = (event) => {
    setQuantityCounter(Number(event.target.value));
  };

  const handleAddItem = async () => {
    try {
      // Assuming you have an API endpoint to add items to the room
      await axios.post(`http://localhost:3001/room/addItemToRoom/${roomNumber}`, {
        inventory_item_id: selectedInventoryItem.id, // Adjust the field according to your data model
        quantity: quantityCounter,
      });

      closeAddItemModal();
      await fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  };

  const openViewModal = (bookingData) => {
    setAssociatedBooking(bookingData);
    setViewModalOpen(true);
  };

  const closeViewModal = () => setViewModalOpen(false);

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);

  const openOccupancyModal = () => setOccupancyModalOpen(true);
  const closeOccupancyModal = () => setOccupancyModalOpen(false);

  const reRender = () => {
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
  };

  const handleEdit = (roomData) => {
    setSelectedItem(roomData);
    setEditedRoomStatus(roomData.roomStatus); // Set initial edited room status
    setEditedRoomNumber(roomData.roomNumber);
    setEditedRoomType(roomData.roomType);
    setEditedFloorNumber(roomData.floorNumber);
    openEditModal();
  }

  const handleViewModalOpen = async () => {
    try {
      let bookingData = null;
  
      if (editedRoomStatus === 'Expected Arrival') {
        const response = await axios.get(`http://localhost:3001/booking/getBookingByRoom/${roomNumber}`);
        bookingData = response.data;
      }
      if(roomStatus === 'Occupied'){
        getTenantByRoom(roomNumber);
      }
      console.log(currentTenant);
      openViewModal(bookingData);
    } catch (err) {
      console.log(err);
    }
  };

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
      setSelectedItem(null);
      closeViewModal();
      await fetchData(); // Fetch updated data
      console.log("Fetch data completed")
    } catch (err) {
      console.log(err);
    }
  }

  const getTenantByRoom = async (roomNumber) => {
    try{
      console.log(roomNumber)
      const response = await axios.get(`http://localhost:3001/tenant/getTenantByRoom/${roomNumber}`)
      if(response){
        setCurrentTenant(response.data);
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (roomNumber) => {
    try {
      // Assuming you have an API endpoint to delete the room

      await axios.put(`http://localhost:3001/room/deleteRoom/${roomNumber}`);
      await fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  }

  const handleCheckOut = async (roomNumber) => {
    try {
      console.log(roomNumber)
        await axios.put(`http://localhost:3001/transaction/handleCheckOut/${roomNumber}`);
        closeViewModal();
        await fetchData(); // Fetch updated data
        window.location.reload();
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

  const handleOccupancyChange = async (roomNumber) => {
    try {
      // Assuming you have an API endpoint to update the room status
      await axios.put(`http://localhost:3001/room/updateRoom/${roomNumber}`, {
        room_status: editedRoomStatus,
      });
      closeOccupancyModal();
      setSelectedItem(null);
      fetchData(); // Fetch updated data
      
    } catch (err) {
      console.log(err);
    }
  };

  const confirmBooking = async () => {
    try{
      const tenantData = {
        first_name: associatedBooking[0].first_name,
        last_name: associatedBooking[0].last_name,
        booking_id: associatedBooking[0].booking_id,
        room_number: roomNumber
      };
      const response = await axios.post('http://localhost:3001/tenant/createTenant', tenantData)
      console.log(response.data);
      setAssociatedBooking(null);
      closeViewModal();
      await new Promise(resolve => setTimeout(resolve, 500));
        // Fetch updated data
      await fetchData();
  
        // Update the occupancy overview
        updateOccupancyOverview();
        console.log("IM DONE");
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className="roomSquare">
      <p className='roomNumber'>{roomNumber}</p>
        <div className='roomCardButtons'>
          <button className="btn" onClick={handleViewModalOpen}>
          <FontAwesomeIcon icon={faEye}/>
          </button>
        {userData.role === "Admin" && (
          <div>
            <button className="btn" onClick={() => handleEdit({ roomNumber, roomType, roomStatus, floorNumber })}>
            <FontAwesomeIcon icon={faPenToSquare}/>
            </button>
            <button className="btn" onClick={() => handleDelete(roomNumber)}>
            <FontAwesomeIcon icon={faTrashCan}/>
            </button>
          </div>
      )}
      </div>
      <div className='occupancyIndicator' onClick={openOccupancyModal} style={{ backgroundColor: getOccupancyIndicatorColor()}}>
      <p className='roomStatus'>{editedRoomStatus}</p>
      </div>

      {/* View Modal */}
      <Modal show={viewModalOpen} onHide={closeViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <p>Room Number: {roomNumber}</p>
          <p>Room Type: {roomType}</p>
          <p>Room Status: {editedRoomStatus}</p>
          </div>
          {editedRoomStatus === 'Expected Arrival' && associatedBooking && (
          <div>
            <h5>Associated Booking:</h5>
            <p>Check In: {associatedBooking[0].check_in_date || "N/A"}</p>
            <p>Check Out: {associatedBooking[0].check_out_date || "N/A"}</p>
            <p>Name: {associatedBooking[0].first_name || "N/A"} {associatedBooking[0].last_name || "N/A"}</p>
            <p>Number of Guests(Adult): {associatedBooking[0].number_of_guests_adult || "N/A"}</p>
            <p>Number of Guests(Children): {associatedBooking[0].number_of_guests_children || "N/A"}</p>
            <p>Email: {associatedBooking[0].email || "N/A"}</p>
            <p>Phone Number: {associatedBooking[0].phone_number || "N/A"}</p>
            <p>Country: {associatedBooking[0].country || "N/A"}</p>
            <Button variant="primary" onClick={confirmBooking}>
            Confirm Booking
            </Button>
          </div>
        )}
        {editedRoomStatus === 'Occupied' && currentTenant && (
          <div>
            <h1>Current Tenant</h1>
            <p>Name: {currentTenant[0].first_name || "N/A"} {currentTenant[0].last_name || "N/A"}</p>
            <p>Current Balance: {currentTenant[0].current_balance || "N/A"}</p>
            <p>Duration of Stay: {currentTenant[0].check_in_date || "N/A"} - {currentTenant[0].check_out_date || "N/A"}</p>
            <p>Additional Details: {currentTenant[0].additional_details || "N/A"}</p>
            <h1>Orders</h1>
            <Button variant="primary" onClick={openAddItemModal}>
              Add Item
            </Button>
            <Button variant="secondary" onClick={(e) => handleCheckOut(roomNumber)}>
              Check Out
            </Button>
          </div>
        )}
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

      {/* Add Item Modal */}
      <Modal show={addItemModalOpen} onHide={closeAddItemModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item to Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for selecting inventory item and setting quantity */}
          <form>
            <div className="form-group">
              <label htmlFor="inventoryItem">Select Inventory Item:</label>
              {/* Implement a dropdown or other selection mechanism for inventory items */}
              {/* Example: */}
              <select
                className="form-control"
                id="inventoryItem"
                onChange={(e) => handleItemSelection(e.target.value)}
              >
                {/* Map over the inventory items to populate the dropdown */}
                <option value="" disabled selected hidden>Choose Item</option>
                {inventoryItems.map((item) => (
                  <option key={item.id} value={item}>
                    {item.item_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantityCounter}
                onChange={handleQuantityChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelAddItem}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default RoomSquare;