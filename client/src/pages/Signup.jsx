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
    const [userNErr, setUserNErr] = useState(false);
    const [lastNErr, setLastNErr] = useState(false);
    const [firstNErr, setFirstNErr] = useState(false);
    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [phoneErr, setPhoneErr] = useState(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const emailRegEx=new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
      const passwRegEx=new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
      const phoneRegEx=new RegExp('^[0-9]+$');

      if(formData.username===""){
        setUserNErr(true);
      }

      if(!passwRegEx.test(formData.password)){
        setPwdError(true);
      }

      if(formData.firstName===""){
        setFirstNErr(true);
      }

      if(formData.lastName===""){
        setLastNErr(true);
      }

      if(!emailRegEx.test(formData.email)){
        setEmailErr(true);
      }

      if(!phoneRegEx.test(formData.phoneNumber)){
        setPhoneErr(true);
      }

      if(!(pwdError||emailErr||firstNErr||lastNErr||userNErr||phoneErr)){
        try {
          const response = await axios.post('http://localhost:3001/user/register', formData);
          console.log(response.data);
          history.push('/Login');
        } catch (error) {
          console.error('Error submitting form:', error.response.data);
        }
      }
      setEmailErr(false)
      setFirstNErr(false)
      setLastNErr(false)
      setPhoneErr(false)
      setPwdError(false)
      setUserNErr(false)
    };

  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='signupWrapper'>
                    <div className='signupCard'>
                            <p className='signupHeader'>Sign Up</p>
                            <form action="submit" className='signupForm' autoComplete='off'>
                                <input type="text" name="username" id=""  onChange={handleChange} placeholder="Username" className='inputFormSignup'/>
                                {userNErr&&<span style={{color:"red"}}>Please enter a username</span>}
                                <input type="password" name="password" id=""  onChange={handleChange} placeholder="Password" className='inputFormSignup'/>
                                {pwdError&&<span style={{color:"red"}}>Please enter a password</span>}
                                <input type="text" name="firstName" id=""  onChange={handleChange} placeholder="First Name" className='inputFormSignup'/>
                                {firstNErr&&<span style={{color:"red"}}>Please enter your first name</span>}
                                <input type="text" name="lastName" id=""  onChange={handleChange} placeholder="Last Name" className='inputFormSignup'/>
                                {lastNErr&&<span style={{color:"red"}}>Please enter your last name</span>}
                                <input type="text" name="phoneNumber" id=""  onChange={handleChange} placeholder="Phone Number" className='inputFormSignup'/>
                                {phoneErr&&<span style={{color:"red"}}>Please enter your phone number</span>}
                                <input type="email" name="email" id=""  onChange={handleChange} placeholder="Email" className='inputFormSignup'/>
                                {emailErr&&<span style={{color:"red"}}>Please enter valid Email Address</span>}
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