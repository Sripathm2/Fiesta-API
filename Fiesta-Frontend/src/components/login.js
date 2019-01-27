import React from 'react';
import '../css/signup-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'
import {Link} from "react-router-dom";


const login = () => (
    <div className="App body page-index clearfix">
        <div class="container12132332e"></div>
        <div class="container2323"></div>
        <input id="username" className="_input _input-13" placeholder="Username" type="text"/>
        <input id="password" className="_input _input-16" placeholder="Password" type="password"/>
        <button className="_button _button-2" onClick={enter}>Login</button>
        <p className="text text-3">Forgot Password? <a onClick={forgotPassword}>Click Here</a></p>
        <Link to="/create_user" >New to Carnet? </Link>
    </div>
);

function forgotPassword(){
    let userdata = {};
    userdata.userName = document.getElementById("username").value;

    console.log("swdcwsd");
    if(userdata.userName.length < 6){
        alert('Please enter your username before proceeding for forgotPassword.');
        return;
    }

    let url='https://carnet-api.herokuapp.com/user/forgetPassword?userName='+userdata.userName;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            document.cookie = 'securityQuestion=' + response.data.securityQuestion + ';path=/';
            window.location.replace("/forget");

        })
        .catch(function (error) {
            alert(error);
        });
}

function enter(){
    let userdata = {};
    userdata.userName = document.getElementById("username").value;
    userdata.password = document.getElementById("password").value;

    let url='https://carnet-api.herokuapp.com/auth/token?userName='+userdata.userName+'&password='+userdata.password;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            let token = response.data.token;
            document.cookie = 'token=' + token + ';path=/';
            window.location.replace('/dashboard');
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default login;