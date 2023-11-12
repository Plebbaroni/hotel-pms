import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/Login" component = {Login}/>
          <Route path="/Signup" component = {Signup}/>
        </Switch>
    </>
  )
}

export default App
