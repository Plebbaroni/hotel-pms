import React, {useState, useEffect} from 'react'
import axios from 'axios'

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
      const response = await axios.post('', inventoryFormData)
      console.log(response.data)
    }catch(error){
      console.error('Error submitting form:', error.response.data)
    }
  }

  return (
    <div className='addEntryWrapper'>
      <div className='addRoomDiv'>
        <h1>Add Room</h1>
        <form action="submit">
          <input type="number" name="roomnumber" placeholder='Room Number' onChange={handleChangeRoom}/>
          <input type="number" name="roomfloor" placeholder='Room Floor' onChange={handleChangeRoom}/>
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
        <form action="submit">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <select name="" id="">
            <option value="" disabled selected></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default AddEntryComp