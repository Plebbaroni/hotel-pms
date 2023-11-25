import React, {useState, useEffect} from 'react'
import axios from 'axios'

function UserListComp() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try{
          const response = await axios.get('http://localhost:3001/user/getAllUsers');
          console.log(response);
          setUserData(response.data);
      }catch(err){
          console.log(err);
      }
  }

  return (
    <div>
      {userData.map(user => (
        <div key={user.id}>
          {user.id}
          {user.username}
          {user.first_name}
          {user.last_name}
          {user.email}
          {user.phone_number}
          {user.role}
        </div>
      ))}
    </div>
  )
}

export default UserListComp