import React, {useState, useEffect} from 'react'
import axios from 'axios'

function InventoryOverview() {
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try{
          const response = await axios.get('http://localhost:3001/inventory/getAllItems');
          console.log(response);
          setItemData(response.data);
      }catch(err){
          console.log(err);
      }
  }

  return (
    <div>
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
  )
}

export default InventoryOverview