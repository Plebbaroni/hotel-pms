import React from 'react'
import {Link} from 'react-router-dom'
import "../css/Signup.css"

function Signup() {
  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='signupWrapper'>
                    <div className='signupCard'>
                            <p className='signupHeader'>Sign Up</p>
                            <form action="submit" className='signupForm'>
                                <input type="text" name="" id=""  placeholder="Username" className='inputFormSignup'/>
                                <input type="text" name="" id=""  placeholder="Password" className='inputFormSignup'/>
                                <input type="text" name="" id=""  placeholder="First Name" className='inputFormSignup'/>
                                <input type="text" name="" id=""  placeholder="Last Name" className='inputFormSignup'/>
                                <input type="text" name="" id=""  placeholder="Phone Number" className='inputFormSignup'/>
                                <input type="email" name="" id=""  placeholder="Email" className='inputFormSignup'/>
                            </form>
                                <p className='joeText'>Already have an account?<Link to="/Login"> Log In</Link></p>
                            <button className='signupButton'>Sign Up</button>
                    </div>
                </div>
            </div>   
    </div>
  )
}

export default Signup