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
      {itemData.map(item => (
        <div key={item.item_name}>
          {item.item_name}
          {item.item_price}
          {item.item_quantity}
          {item.is_perishable}
        </div>
      ))}
    </div>
  )
}

export default InventoryOverview