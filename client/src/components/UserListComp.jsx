import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/userListComp.css';

function UserListComp() {
  const [userData, setUserData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Declare state variable for selectedUser

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user/getAllUsers');
      console.log(response);
      setUserData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  }

  const handleDelete = async (userId) => {
    try {
      // Assuming you have an API endpoint to update the user as deleted
      await axios.put(`http://localhost:3001/user/deleteUser/${userId}`);
      fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  }

  const handleSaveEdit = async () => {
    // Implement the logic to save the edited user data
    // You may need to make a PUT request to update the user details
    // After updating, close the modal and fetch the updated data
    setShowEditModal(false);
    setSelectedUser(null);
    fetchData();
  }


  return (
    <div className='userListCompWrapper'>
    <h2>User List</h2>
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Role</th>
          <th></th> 
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.phone_number}</td>
            <td>{user.role}</td>
            <td>
              <button className="btn btn-sm btn-secondary mr-2" onClick={() => handleEdit(user)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger m1-2" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Edit form components based on selectedUser */}
          {/* For example: */}
          {/* <input type="text" value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} /> */}
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
    </div>
    
  );
}

export default UserListComp