import React, { Component } from "react";
import Navbar from "./Navbar";
import ReservationBody from "./ReservationBody"
import "../css/Reservation.css"

class Reservation extends Component{
    render(){
        return(
            <div>
                <ReservationBody/>
            </div>
        );
    }
}

export default Reservation;