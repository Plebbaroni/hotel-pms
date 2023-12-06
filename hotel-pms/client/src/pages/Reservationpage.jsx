import React, { Component } from "react";
import ReservationBody from "../components/ReservationBody"
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