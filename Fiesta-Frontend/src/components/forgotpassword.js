import React from 'react';
import '../css/forgetpassword-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'
import '../css/bootstrap.css';
import '../css/bootstrap-grid.css'; 
import '../css/forgot.css'; 

const forgotpassword = () => (
    load(),
        
        <div className="App body page-forgetpassword clearfix">
            <div id = "forgotcont"className="container _element container-3">
            <div className="col-sm-12 col-md-12 col-lg-12">
                <img id = "forgotimg" src={require("../res/fiestalogo.png")} alt="cannot display"/>
            </div>
            <br></br>
            <h4>Reset Password</h4>
            <hr></hr>
            <form>
            
            <div class="form-group">
                <input type="text" class="form-control _input _input-5" id="formGroupExampleInput Q" placeholder="Enter Security Question"></input>
            </div>
            <div class="form-group">
                <input type="text" class="form-control _input _input-7" id="formGroupExampleInput2 A" placeholder="Answer"></input>
            </div>
            <div class="form-group">
                <input type="password" class="form-control _input _input-10" id="formGroupExampleInput2 password" placeholder="New Password"></input>
            </div>
            <div class="form-group">
                <input type="password" class="form-control _input _input-14" id="formGroupExampleInput2 repass" placeholder="Re-Enter New Password"></input>
            </div>
            <div class="form-row">
                <div class="col">
                <button type="submit" onClick={reset} class="btn btn-dark _button _button-1">Reset</button>
                </div>
                <div class="col">
                <button type="submit" class="btn btn-dark _button _button-1">Login</button>
                </div>
            </div>
            </form>

           {/*<p className="text1">Reset Password</p>*/} 
            
            </div>
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

    let url='https://fiesta.herokuapp.com/user/forgetPassword';

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

    let url='https://fiesta.herokuapp.com/user/forgetPassword?userName='+user;

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


