import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios';
import { Link } from "react-router-dom";

const Create_user = () => (
    <div className="App body page-signup clearfix">
        <div className="container _element container-1"></div>
        <div className="container _element container-2"></div>
        <input id ="firstName" className="_input _input-1" placeholder="First Name" type="text"/>
        <input id = "lastName" className="_input _input-2" placeholder="Last Name" type="text"/>
        <input id = "emailId" className="_input _input-3" placeholder="Email Address" type="email"/>
        <input id = "userName" className="_input _input-4" placeholder="User Name" type="text"/>
        <input id = "password" className="_input _input-6" placeholder="Password" type="password"/>
        <input id = "rePass" className="_input _input-9" placeholder="Re-Enter Password" type="password"/>
        <input id = "SQ" className="_input _input-12" placeholder="Enter Security Question" type="text"/>
        <p className="text text-2">Welcome!</p>
        <input id = "SA" className="_input _input-18" placeholder="Answer" type="text"/>
        <button className="_button _button-4" onClick={signUp}>Sign Up</button>
        <Link to="/login" >Already have a Account ? </Link>
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
