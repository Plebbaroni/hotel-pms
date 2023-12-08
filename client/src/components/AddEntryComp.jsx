import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../css/AddEntry.css'
function AddEntryComp() {

  const [roomFormData, setRoomFormData] = useState ({
    roomnumber: '',
    roomfloor: '',
    roomtype: ''
  });

  const [inventoryFormData, setInventoryFormData] = useState ({
    itemname: '',
    itemprice: '',
    itemquantity: '',
    isperishable: ''
  });

  const handleChangeRoom = (e) => {
    setRoomFormData({
      ...roomFormData,
      [e.target.name]: e.target.value,
    });
  };

  // If no errors, adds a room that is ready for booking
  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    console.log(roomFormData)
    try{
      const response = await axios.post('http://localhost:3001/room/addRoom', roomFormData);
      console.log(response.data);
    }catch(error){
      console.error('Error submitting form:', error.response.data)
    }
  }

  const handleChangeItem = (e) =>{
    setInventoryFormData({
      ...inventoryFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    console.log(inventoryFormData)
    try{
      const response = await axios.post('http://localhost:3001/inventory/addItem', inventoryFormData)
      console.log(response.data)
    }catch(error){
      console.error('Error submitting form:', error.response.data)
    }
  }

  return (
    <div className='addEntryWrapper'>
      <div className='addRoomDiv'>
        <h1>Add Room</h1>
        <form className='entryForm' action="submit" autoComplete='off'>
          <input type="number" name="roomnumber" placeholder='Room Number' onChange={handleChangeRoom}/>
          <input type="number" name="roomfloor" placeholder='Room Floor' onChange={handleChangeRoom}/>
          <br />
          <select name="roomtype" placeholder='Room Type' onChange={handleChangeRoom} value={roomFormData.roomtype}>
            <option value="" disabled selected>Room Type</option>
            <option value="Deluxe Room">Deluxe Room</option>
            <option value="Family Room">Family Room</option>
            <option value="Standard Room">Standard Room</option>
            <option value="Suite Room">Suite Room</option>
            <option value="Superior Room">Superior Room</option>
          </select>
          <button onClick={handleRoomSubmit}>Add Room</button>
        </form>
      </div>
      <div className='addInvDiv'>
        <h1>Add Inventory</h1>
        <form className='entryForm' action="submit" autoComplete='off'>
          <input type="text" name="itemname" placeholder='Item Name' onChange={handleChangeItem}/>
          <input type="number" name="itemprice" placeholder='Item Price' onChange={handleChangeItem}/>
          <input type="number" name="itemquantity" placeholder='Item Quantity' onChange={handleChangeItem}/>
          <br />
          <select name="isperishable" id="" onChange={handleChangeItem} value={inventoryFormData.isperishable}>
            <option value="" disabled selected>Perishable?</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
          <button onClick={handleItemSubmit}>Add Item</button>
        </form>
      </div>
    </div>
  )
}

export default AddEntryComp