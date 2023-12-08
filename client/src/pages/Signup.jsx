import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import validator from 'validator'
import axios from 'axios'
import "../css/Signup.css"

// The signup page starts with an empty form
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
    const [userNErr, setUserNErr] = useState(false);
    const [lastNErr, setLastNErr] = useState(false);
    const [firstNErr, setFirstNErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [phoneErr, setPhoneErr] = useState(false);

    // Changes the value of the form after each input
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    // Is called when clicking the sign up button
    const handleSubmit = async (e) => {
      e.preventDefault(); 
      
      // Errors that may occur when inputting
      setUserNErr(false);
      setPwdError(false);
      setFirstNErr(false);
      setLastNErr(false);
      setPhoneErr(false);
      setEmailErr(false);
    
      const passwRegEx = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
    
      if (validator.isEmpty(formData.username)) {
        setUserNErr(true);
        console.error("No username detected")
      }
      
      if (!(passwRegEx.test(formData.password))) {
        setPwdError(true);
        console.error("Invalid or no password")
      }
    
      if (validator.isEmpty(formData.firstName)) {
        setFirstNErr(true);
        console.error("No first name")
      }
    
      if (validator.isEmpty(formData.lastName)) {
        setLastNErr(true);
        console.error("no last name")
      }
    
      if (!(validator.isEmail(formData.email))) {
        setEmailErr(true);
        console.error("Invalid or no email")
      }
    
      if (!(validator.isMobilePhone(formData.phoneNumber))) {
        setPhoneErr(true);
        console.error("Invalid or no phone no.")
      }
      
      // If no errors, registers the user
      if (!(pwdError || emailErr || firstNErr || lastNErr || userNErr || phoneErr)) {
        try {
          const response = await axios.post('http://localhost:3001/user/register', formData);
          console.log(response.data);
          history.push('/Login');
        } catch (error) {
          console.error('Error submitting form:', error.response.data);
        }
      }else{
        console.error('Form submission aborted due to validation errors');
      }
    };
  
  // Signup card
  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='signupWrapper'>
                    <div className='signupCard'>
                            <p className='signupHeader'>Sign Up</p>
                            <form action="submit" className='signupForm' autoComplete='off'>
                                <input type="text" name="username" id=""  onChange={handleChange} placeholder="Username" className={userNErr ? "Red" : "inputFormSignup"}/>                               
                                <input type="password" name="password" id=""  onChange={handleChange} placeholder="Password" className={pwdError ? "Red" : "inputFormSignup"}/>
                                <span style={{ color: "red" }}>{userNErr ? "Please enter a username" : null}</span>
                                <span style={{ color: "red" }}>{pwdError ? "Password must have numbers, upper case, and 6 characters" : null}</span>

                                <input type="text" name="firstName" id=""  onChange={handleChange} placeholder="First Name" className={firstNErr ? "Red" : "inputFormSignup"}/>
                                <input type="text" name="lastName" id="" onChange={handleChange} placeholder="Last Name" className={lastNErr ? "Red" : "inputFormSignup"}/>
                                <span style={{ color: "red" }}>{firstNErr ? "Please enter your first name" : null}</span>
                                <span style={{ color: "red" }}>{lastNErr ? "Please enter your last name" : null}</span>     

                                <input type="tel" name="phoneNumber" id="" onChange={handleChange} placeholder="Phone Number" className={phoneErr ? "Red" : "inputFormSignup"}/>
                                <input type="email" name="email" id=""  onChange={handleChange} placeholder="Email" className={emailErr ? "Red" : "inputFormSignup"}/>
                                <span style={{ color: "red" }}>{phoneErr ? "Please enter your phone number" : null}</span>
                                <span style={{ color: "red" }}>{emailErr ? "Please enter valid Email Address" : null}</span>
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