import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function InventoryOverview() {
  const [itemData, setItemData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Declare state variable for selectedItem


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/inventory/getAllItems');
      console.log(response);
      setItemData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  }

  const handleDelete = async (item_id) => {
    try {
      // Assuming you have an API endpoint to delete the item
      await axios.put(`http://localhost:3001/inventory/deleteItem/${item_id}`);
      fetchData(); // Fetch updated data
    } catch (err) {
      console.log(err);
    }
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  }

  const handleSaveEdit = async () => {
    try {
      // Assuming you have an API endpoint to update the item details
      await axios.put(`http://localhost:3001/inventory/updateItem/${selectedItem.item_id}`, {
        item_id: selectedItem.item_id,
        item_name: selectedItem.item_name,
        item_price: selectedItem.item_price,
        item_quantity: selectedItem.item_quantity,
        is_perishable: selectedItem.is_perishable,
      });
      setShowEditModal(false);
      setSelectedItem(null);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='tablewrapper'>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
            <th>Is Perishable</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {itemData.map(item => (
            <tr key={item.item_name}>
              <td>{item.item_name}</td>
              <td>{item.item_price}</td>
              <td>{item.item_quantity}</td>
              <td>{item.is_perishable.toString()}</td>
              <td>
              <button className="btn btn-sm btn-primary">
                  View
                </button>
                <button className="btn btn-sm btn-secondary mr-2" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-danger m1-2" onClick={() => handleDelete(item.item_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem ? (
            <form>
              <div className="form-group">
                <label htmlFor="itemName">Item Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  value={selectedItem.item_name}
                  onChange={(e) => setSelectedItem({ ...selectedItem, item_name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemPrice">Item Price:</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemPrice"
                  value={selectedItem.item_price}
                  onChange={(e) => setSelectedItem({ ...selectedItem, item_price: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="itemQuantity">Item Quantity:</label>
                <input
                  type="text"
                  className="form-control"
                  id="itemQuantity"
                  value={selectedItem.item_quantity}
                  onChange={(e) => setSelectedItem({ ...selectedItem, item_quantity: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="isPerishable">Is Perishable:</label>
                <select
                  className="form-control"
                  id="isPerishable"
                  value={selectedItem.is_perishable.toString()}
                  onChange={(e) => setSelectedItem({ ...selectedItem, is_perishable: e.target.value === 'true' })}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </form>
          ) : (
            <p>No item selected</p>
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

export default InventoryOverview;