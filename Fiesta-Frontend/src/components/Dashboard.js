import React from 'react';
import '../css/dashboard.css'
const Dashboard = () => (
    <div className="App">
        <div id="container">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <img id = "forgotimg" src={require("../res/fiestalogo.png")} alt="cannot display"/>
            </div>
            <h2>Dashboard</h2>
            <hr></hr>
            <div class = "row">
            <div class = "col-2">
                <h4>Profile</h4>
                <h6>Name</h6>
                <h6>Email</h6>
                <button type="button" class="btn btn-secondary">Send Email Invite</button>
            </div>
            <div class = "col-10">
                <button type="button" class="btn btn-secondary btn-lg btn-block">Add Event +</button>
                
            </div>
            </div>
        </div>
        <footer className="footer">
            <div>
            <p>Fiesta Copyright &copy; 2019. Ethan Niu, Shivangi Chand, Siddharth Dhar, Sripath Mishra, Pooja Tewari
            </p>
            </div>
        </footer>
    </div>
);

export default Dashboard;