import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../css/bootstrap.css';
import '../css/bootstrap-grid.css';
import '../css/createUser.css';

const Create_user = () => (
    <div className="App body page-signup clearfix">
        <div id="createUserCon" class = "container" >
            <div className="col-sm-12 col-md-12 col-lg-12">
                <img id="createimg" src={require("../res/fiestalogo.png")}  alt="cannot display"/>
            </div>
            <br></br>
            <h4>Register</h4>
            <hr></hr>

            <form>
                <div class = "form-group">
                    <input id ="firstName" class="form-control _input _input-1" placeholder="First Name" type="text"/>
                </div>
                <div className="form-group">
                    <input id = "lastName" class="form-control _input _input-2" placeholder="Last Name" type="text"/>
                </div>
                <div className="form-group">
                    <input id = "emailId" class="form-control _input _input-3" placeholder="Email Address" type="email"/>
                </div>
                <div className="form-group">
                    <input id = "userName" class="form-control _input _input-4" placeholder="User Name" type="text"/>
                </div>
                <div className="form-group">
                    <input id = "password" class="form-control _input _input-6" placeholder="Password" type="password"/>
                </div>
                <div className="form-group">
                    <input id = "rePass" class="form-control _input _input-9" placeholder="Re-Enter Password" type="password"/>
                </div>
                <div className="form-group">
                    <input id = "SQ" class="form-control _input _input-12" placeholder="Enter Security Question" type="text"/>
                </div>
                <div className="form-group">
                    <input id = "SA" class="form-control _input _input-18" placeholder="Answer" type="text"/>
                </div>
                <div className="form-row">
                    <div className="col">
                        <button type="submit" onClick={signUp} className="btn btn-dark _button _button-4">Sign Up</button>
                    </div>
                </div>
            </form>

            <br></br>
            <Link to="/login" >Already have a Account ? </Link>
            <br></br>
        </div>
    </div>
);

function signUp() {
    let userdata = {};
    userdata.userName = document.getElementById("userName").value;
    userdata.password = document.getElementById("password").value;
    userdata.email = document.getElementById("emailId").value;
    userdata.securityQuestion = document.getElementById("SQ").value;
    userdata.securityAnswer = document.getElementById("SA").value;
    userdata.fname = document.getElementById("firstName").value;
    userdata.lname = document.getElementById("lastName").value;
    axios({
        method:'post',
        url:'https://carnet-api.herokuapp.com/user/register',
        data:{
            userName:userdata.userName,
            password:userdata.password,
            email: userdata.email,
            securityQuestion: userdata.securityQuestion,
            securityAnswer: userdata.securityAnswer,
            name: userdata.fname +" "+ userdata.lname,
        }
    })
        .then(function (response) {
            console.log(response.data);
            window.location.replace("/login");

        })
        .catch(function (error) {
            console.log(error + '1');
        });
}
export default Create_user;
