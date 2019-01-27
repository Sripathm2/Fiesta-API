import React from 'react';
import '../css/forgetpassword-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'

const forgotpassword = () => (
    load(),
        <div className="App body page-forgetpassword clearfix">
            <div className="container _element container-3"></div>
            <div className="container"></div>
            <input id = "Q"className="_input _input-5" placeholder="Enter Security Question" type="text"/>
            <input id = "A" className="_input _input-7" placeholder="Answer" type="text"/>
            <input id = "password"className="_input _input-10" placeholder="Password" type="password"/>
            <input id = "repass"className="_input _input-14" placeholder="Re-Enter Password" type="password"/>
            <button className="_button _button-1" onClick={reset}>Reset</button>
            <p className="text1">Reset Password</p>
            <p className="text text-4"><a>Login</a></p>


        </div>
);

function readCookie(){
    let ca = document.cookie.split(';');
    return ca[0];
}

function reset(){
    let user;
    user = readCookie();
    console.log(user);
    let data={};
    data.user = user;
    data.Q = document.getElementById("Q").value;
    data.A = document.getElementById("A").value;
    data.password = document.getElementById("password").value;
    data.repass = document.getElementById("repass").value;

    let url='https://carnet-api.herokuapp.com/user/forgetPassword';

    axios({
        method: 'post',
        url:url,
        data:{
            userName:data.user,
            password:data.password,
            securityQuestion: data.Q,
            securityAnswer: data.A,

        }
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
}

function load(){
    let user;
    user = readCookie();

    let url='https://carnet-api.herokuapp.com/user/forgetPassword?userName='+user;

    axios({
        method: 'get',
        url:url,
    })
        .then(function (response) {
            document.getElementById("Q").value = response.data.securityQuestion;
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default forgotpassword;


