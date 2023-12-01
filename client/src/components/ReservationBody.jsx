import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory, useLocation} from 'react-router-dom';

function Body(){
    const history = useHistory();
    const location = useLocation();
    const room_type  = location.state;

    useEffect(() => {
        console.log(room_type);
    }, []);

    function returnHome(){
        history.push('/')
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        //Logic for db thingy here
        returnHome();
    }
    return(
        <div>
            <center>
                <div className="Title">
                    <h1>Your Reservation</h1><a href=""><button onClick={returnHome}>X</button></a>
                </div>
                <div className="Form">
                    <div className="ReserveBox">
                        <div className="Personal">
                            <h1>Personal Information</h1>
                            <input type="text" id="fname" placeholder="First Name"/>
                            <br />
                            <input type="text" id="lname" placeholder="Last Name"/>
                            <br />
                            <input type="text" id="email" placeholder="Email"/>
                            <br />
                            <input type="text" id="number"placeholder="Phone Number"/>
                        </div>
                    </div>
                    <div className="ReserveBox">
                        <div>
                            <h1>Payment Information</h1>
                        </div>
                    </div>
                    <div className="ReserveBox">
                        <div>
                            <h1>Price Summary</h1>
                        </div>
                    </div>
                    <div className="ButtonDiv">
                        <button onClick={handleConfirm}>Confirm</button>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default Body;