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
    try {
      // Assuming you have an API endpoint to update the user details
      await axios.put(`http://localhost:3001/user/updateUser/${selectedUser.id}`, {
        username: selectedUser.username,
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email,
        phone_number: selectedUser.phone_number,
        role: selectedUser.role,
      });
      setShowEditModal(false);
      setSelectedUser(null);
      fetchData();
    } catch (err) {
      console.log(err);
    }
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
        {selectedUser ? (
    <form>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={selectedUser.username}
          onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={selectedUser.first_name}
          onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          className="form-control"
          id="lastName"
          value={selectedUser.last_name}
          onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={selectedUser.email}
          onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="number">Phone Number:</label>
        <input
          type="text"
          className="form-control"
          id="phonenumber"
          value={selectedUser.phone_number}
          onChange={(e) => setSelectedUser({ ...selectedUser, phone_number: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          className="form-control"
          id="role"
          value={selectedUser.role}
          onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
        >
        <option value="Customer">Customer</option>
        <option value="Employee">Employee</option>
        <option value="Admin">Admin</option>
        </select>
      </div>

      </form>
    ) : (
      <p>No user selected</p>
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
    </div>
    
  );
}

export default UserListComp