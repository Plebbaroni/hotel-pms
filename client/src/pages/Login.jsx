import React from 'react'
import "../css/Login.css"
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='loginWrapper'>
                    <div className='loginCard'>
                            <p className='loginHeader'>Log In</p>
                            <form action="submit" className='loginForm'>
                                <input type="text" name="" id=""  placeholder="Username" className='inputFormLogin'/>
                                <input type="text" name="" id=""  placeholder="Password" className='inputFormLogin'/>
                            </form>
                                <p className='joeText'>Don't have an account?<Link to="/Signup"> Sign Up</Link></p>
                            <button className='loginButton'>Log In</button>
                    </div>
                </div>
            </div>
        
    </div>
  )
}

export default Login