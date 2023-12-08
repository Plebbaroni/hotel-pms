import React, {useState} from 'react'
import "../css/Login.css"
import {Link, useHistory } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext.jsx';
import axios from 'axios';

// The Login Page starts with and empty form
const Login = ({ onLogin }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // Changes the value of the form after each input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    // Checks if submit button is clicked and if user type is customer, employee or admin and directs them to their proper UI.
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('http://localhost:3001/user/login', formData);
        const { id, username, role } = response.data;
        sessionStorage.setItem('user', JSON.stringify({ id, username, role }));
        const userDataString = sessionStorage.getItem('user');
        console.log('userDataString:', userDataString); //Is this necessary?
        const userData = userDataString ? JSON.parse(userDataString) : {};
        if(userData.role === "Customer"){
          history.push('/')
        }else if(userData.role === "Employee"){
          history.push('/Employee')
        }else if(userData.role === "Admin"){
          history.push('/Admin')
        }
      } catch (error) {
        console.error('Error submitting form:', error.response.data);
        
      }
    };
  
  // The login modal
  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='loginWrapper'>
                    <div className='loginCard'>
                            <p className='loginHeader'>Log In</p>
                            <form action="submit" className='loginForm' autoComplete='off'>
                                <input type="text" name="username" onChange={handleChange} placeholder="Username" className='inputFormLogin'/>
                                <input type="password" name="password" onChange={handleChange} placeholder="Password" className='inputFormLogin'/>
                            </form>
                                <p className='joeText'>Don't have an account?<Link to="/Signup"> Sign Up</Link></p>
                            <button className='loginButton' onClick={handleSubmit}>Log In</button>
                    </div>
                </div>
            </div>
        
    </div>
  )
}

export default Login