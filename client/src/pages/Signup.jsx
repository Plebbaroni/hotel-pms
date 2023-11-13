import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import "../css/Signup.css"

function Signup(){
    const history = useHistory();
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
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
        const response = await axios.post('http://localhost:3001/register', formData);
        console.log(response.data);
        history.push('/Login');
      } catch (error) {
        console.error('Error submitting form:', error.response.data);
      }
    };

  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='signupWrapper'>
                    <div className='signupCard'>
                            <p className='signupHeader'>Sign Up</p>
                            <form action="submit" className='signupForm'>
                                <input type="text" name="username" id=""  onChange={handleChange} placeholder="Username" className='inputFormSignup'/>
                                <input type="text" name="password" id=""  onChange={handleChange} placeholder="Password" className='inputFormSignup'/>
                                <input type="text" name="firstName" id=""  onChange={handleChange} placeholder="First Name" className='inputFormSignup'/>
                                <input type="text" name="lastName" id=""  onChange={handleChange} placeholder="Last Name" className='inputFormSignup'/>
                                <input type="text" name="phoneNumber" id=""  onChange={handleChange} placeholder="Phone Number" className='inputFormSignup'/>
                                <input type="email" name="email" id=""  onChange={handleChange} placeholder="Email" className='inputFormSignup'/>
                            </form>
                                <p className='joeText'>Already have an account?<Link to="/Login"> Log In</Link></p>
                            <button className='signupButton' onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
            </div>   
    </div>
  )
}

export default Signup