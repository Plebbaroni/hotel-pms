import { useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProtectedRouteEmployee from './contexts/ProtectedRouteEmployee'
import ProtectedRouteAdmin from './contexts/ProtectedRouteAdmin'
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login.jsx"
import RoomsList from "./pages/RoomsList.jsx"
import AboutUs from "./pages/AboutUs.jsx"
import Amenities from "./pages/Amenities.jsx"
import Reservationpage from "./pages/Reservationpage.jsx"
import RoomPage from "./pages/RoomPage.jsx"
import AvailableRooms from "./pages/AvailableRooms.jsx"
import EmployeeNavbar from "./components/EmployeeNavbar"
import EmployeePage from "./pages/EmployeePage.jsx"
import EmployeePageInventory from "./pages/EmployeePageInventory.jsx"
import EmployeePageHousekeeping from "./pages/EmployeePageHousekeeping.jsx"
import AddEntry from "./pages/AddEntry.jsx"
import UserList from "./pages/UserList.jsx"
import UserPage from "./pages/UserPage.jsx"

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
          <Route path="/AvailableRooms" >
            <Navbar />
            <AvailableRooms/>
          </Route>
          <Route path="/UserPage" >
            <Navbar />
            <UserPage/>
          </Route>
          <ProtectedRouteEmployee path="/Employee" component={EmployeePage}/>
          <ProtectedRouteAdmin path="/Admin" component  ={EmployeePage}/>
          <ProtectedRouteAdmin path="/UserList" component={UserList}/>
          <ProtectedRouteAdmin path="/AddEntry" component={AddEntry}/>
          <ProtectedRouteEmployee path="/Housekeeping" component={EmployeePageHousekeeping}/>
          <ProtectedRouteEmployee path="/Inventory" component={EmployeePageInventory}/>
      </Switch>
    </>
  )
}

export default App
