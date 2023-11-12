import $ from "jquery"


function Body(){

    function Compile(){
        var FN = $('#fname').val();
        var LN = $('#lname').val();
        var E = $('#email').val();
        var C = $('#country').val();
        var N = $('#number').val();
    }

    return(
        <div>
            <center>
                <div className="Title">
                    <h1>Your Reservation</h1><a href=""><button>X</button></a>
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
                            <input type="text" id="country" placeholder="Country"/>
                            <br />
                            <input type="text" id="number"placeholder="Phone Number"/>
                        </div>
                    </div>
                    <div className="ReserveBox">
                        <div>
                            <h1>Payement Information</h1>
                        </div>
                    </div>
                    <div className="ReserveBox">
                        <div>
                            <h1>Price Summary</h1>
                        </div>
                    </div>
                    <div className="ButtonDiv">
                        <button onClick={Compile}>Confrim</button>
                    </div>
                </div>
            </center>
        </div>
    );
}

export default Body;