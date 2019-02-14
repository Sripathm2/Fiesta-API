import React from 'react';
import '../css/landing.css';
import '../css/bootstrap.css';
import '../css/bootstrap-grid.css';


const Home = () => (
    <div className="App">
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#landing">Fiesta</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#team">Team</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#contact">Feedback</a>
                    </li>
                </ul>

            </div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link" href="#">Sign Up</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Login</a>
                </li>

            </ul>
        </nav>

        <div id="landing" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <img class="landingimg" src={require("../res/fiestalogo.png")} alt="cannot display"/>
                    </div>
                </div>
                <div class="jumbotron">
                    <h1 class="display-4">Welcome to Fiesta!</h1>
                    <p class="lead">You're personal party planning app!</p>
                    <hr class="my-4"></hr>
                    <p>Having difficulty planning the next big event? We're here to help!</p>
                    <a class="btn btn-info btn-lg" href="#about" role="button">Learn more</a>
                </div>
            </div>
        </div>

        <div id="about" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>About Fiesta</h2>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <p>Organizing a party is not a simple task and takes a lot of planning. Everyone the host invites would inevitably bring gifts to the party but the host will have to give away the gift if it is a duplicate or it is something they don’t want to use. As a solution to this problem and to streamline the party hosting process, Fiesta would make the process of planning a party easier. With features like creating a guest list, sending invites, finding a place to host the party, catering services depending on the type of party it is and the host’s budget, Fiesta aims to make your celebration unique. Fiesta allows the host to make an Amazon wishlist and share it with everyone invited. Invited guests can decide what to gift from the wish list, they can RSVP through the web app and also get directions to the party location. Hence Fiesta is a one-stop party app.
</p>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-sm">
                        <h4>Create Invites</h4>
                        <hr></hr>
                        <img src= {require("../res/createinvite.jpg")}></img>
                        <p>Instantly create online invites for your parties and keep track of upcoming events</p>
                    </div>
                    <div className="col-sm">
                        <h4>Plan Everything</h4>
                        <hr></hr>
                        <img src= {require("../res/planning.jpg")}></img>
                        <p>Plan everything from food to location to gifts through Fiesta's inbuilt APIs</p>
                    </div>
                    <div className="col-sm">
                        <h4>Celebrate</h4>
                        <hr></hr>
                        <img src= {require("../res/celebrate.jpg")}></img>
                        <p>Celebrate a stress free party, as Fiesta is there to help you!</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="team" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>The Team</h2>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-sm">
                        <h3>Frontend</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <img id="teamimg" src= {require("../res/shiv.jpg")}></img>
                        <h4>Shivangi Chand</h4>
                    </div>
                    <div className="col-sm">
                        <img id="teamimg" src= {require("../res/pooja.jpg")}></img>
                        <h4>Pooja Tewari</h4>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-sm">
                        <h3>Backend</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <img id="teamimg" src= {require("../res/siddharth.jpg")}></img>
                        <h4>Siddharth Dhar</h4>
                    </div>
                    <div className="col-sm">
                        <img id="teamimg" src= {require("../res/sri.JPG")}></img>
                        <h4>Sripath Mishra</h4>
                    </div>
                    <div className="col-sm">
                        <img id="teamimg" src= {require("../res/ethan.jpg")}></img>
                        <h4>Ethan Niu</h4>
                    </div>
                </div>
            </div>
        </div>
        <div id="contact" className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
                        <h2>Contact Us & Provide Feedback</h2>
                    </div>
                </div>
                <hr></hr>

                <p>Have any questions, comments, or concerns? Send us a message below!</p>
                <form>
                    <div class="form row">
                        <div class="col">
                        <input type="text" class="form-control" placeholder="First name"></input>
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" placeholder="Last name"></input>
                        </div>
                    </div>
                    <hr></hr>
                    <div class="form row">
                        <div class="col">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="form-group">

                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder="Message"></textarea>

                    </div>
                    <hr></hr>
                    <button type="submit" className="btn btn-dark" onClick={enter}>Submit</button>
                </form>
            </div>

        </div>
        <footer>
            <div id = "footer">
                <p>Fiesta Copyright &copy; 2019. Ethan Niu, Shivangi Chand, Siddharth Dhar, Sripath Mishra, Pooja Tewari</p>
            </div>
        </footer>

    </div>
);

function enter() {
    let data = {};
    data.text = document.getElementById("exampleFormControlTextarea1").value;
    
    let url = 'https://fiesta.herokuapp.com/user/feedback';
    
    axios({
        method: 'post',
        url: url,
        data: {
            feedbackText: data.text
        }
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default Home;
