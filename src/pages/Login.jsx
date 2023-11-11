import React from 'react'
import "../css/Login.css"
function Login() {
  return (
    <div className='wrapper'>
            <div className='transWrapper'>
                <div className='loginWrapper'>
                    <div className='loginCard'>
                            <p className='loginHeader'>Log In</p>
                            <form action="submit" className='loginForm'>
                                <input type="text" name="" id=""  placeholder="Username" className='inputForm'/>
                                <input type="text" name="" id=""  placeholder="Password" className='inputForm'/>
                            </form>
                                <p className='joeText'>Don't have an account?<a href=""> Sign Up</a></p>
                            <button className='loginButton'>Log In</button>
                    </div>
                </div>
            </div>
        
    </div>
  )
}

export default Login