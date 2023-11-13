import React, {useState} from 'react'
import "../css/Login.css"
import {Link, useHistory } from 'react-router-dom'
import axios from 'axios';

function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', formData);
      console.log(response.data);

      // Assuming successful login, redirect to another page (e.g., dashboard)
      history.push('/');
    } catch (error) {
      console.error('Error submitting form:', error.response.data);
      // Handle login failure, display error message, etc.
    }
  };
  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='loginWrapper'>
                    <div className='loginCard'>
                            <p className='loginHeader'>Log In</p>
                            <form action="submit" className='loginForm'>
                                <input type="text" name="username" id=""  onChange={handleChange} placeholder="Username" className='inputFormLogin'/>
                                <input type="text" name="password" id=""  onChange={handleChange} placeholder="Password" className='inputFormLogin'/>
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