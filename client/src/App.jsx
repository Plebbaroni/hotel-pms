import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login.jsx"
import RoomsList from "./pages/RoomsList.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Amenities from "./pages/Amenities.jsx"

function App() {

  return (
    <>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/Login" component = {Login}/>
          <Route path="/Signup" component = {Signup}/>
          <Route path="/RoomsList" component={RoomsList}/>
          <Route path="/AboutUs" component={AboutUs}/>
          <Route path="/Amenities" component={Amenities}/>
        </Switch>
    </>
  )
}

export default App
