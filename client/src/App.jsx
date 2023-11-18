import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProtectedRouteEmployee from './contexts/ProtectedRouteEmployee'
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login.jsx"
import RoomsList from "./pages/RoomsList.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Amenities from "./pages/Amenities.jsx"
import Reservationpage from "./pages/Reservationpage.jsx"
import RoomPage from "./pages/RoomPage.jsx"
import EmployeeNavbar from "./components/EmployeeNavbar"
import EmployeePage from "./pages/EmployeePage.jsx"
import EmployeePageInventory from "./pages/EmployeePageInventory.jsx"
import EmployeePageHousekeeping from "./pages/EmployeePageHousekeeping.jsx"

function App() {
  const userDataString = sessionStorage.getItem('user');
  const userData = userDataString ? JSON.parse(userDataString) : {};
  

  return (
    <>
      <Switch>
          <Route path="/" exact>
            <Navbar />
            <Homepage/>
          </Route>
          <Route path="/Login">
            <Navbar />
            <Login/>
          </Route>
          <Route path="/Signup">
            <Navbar />
            <Signup/>
          </Route>
          <Route path="/RoomsList">
            <Navbar />
            <RoomsList/>
          </Route>
          <Route path="/Reservationpage">
            <Navbar />
            <Reservationpage/>
          </Route>
          <Route path="/AboutUs">
            <Navbar />
            <AboutUs/>
          </Route>
          <Route path="/Amenities">
            <Navbar />
            <Amenities/>
          </Route>
          <Route path="/RoomsList">
            <Navbar />
            <RoomsList/>
          </Route>
          <Route path="/room/:roomType">
            <Navbar/>
            <RoomPage/>
          </Route>
          <ProtectedRouteEmployee path="/Employee" component={EmployeePage}/>
          <ProtectedRouteEmployee path="/Housekeeping" component={EmployeePageInventory}/>
          <ProtectedRouteEmployee path="/Inventory" component={EmployeePageHousekeeping}/>
      </Switch>
    </>
  )
}

export default App
