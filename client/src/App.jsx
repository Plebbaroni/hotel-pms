import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './contexts/ProtectedRoute'
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login.jsx"
import RoomsList from "./pages/RoomsList.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Amenities from "./pages/Amenities.jsx"
import Reservationpage from "./pages/Reservationpage.jsx"
import RoomPage from "./pages/RoomPage.jsx"

function App() {
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};
  
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
            <Route path="/Reservationpage" component={Reservationpage}/>
            <Route path="/room/:roomType" component={RoomPage} />
          </Switch>
    </>
  )
}

export default App
