import React, {Component} from 'react';
import '../css/dashboard.css'
import Modal from 'react-awesome-modal';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
    <div className="App">
        <div id="container">
           {/* <div className="col-sm-12 col-md-12 col-lg-12">
                <img id = "forgotimg" src={require("../res/fiestalogo.png")} alt="cannot display"/>
        </div>*/}
            <h2>Dashboard</h2>
            <hr></hr>
            <div class = "row">
                <div class = "col-2">
                    <h4>Profile</h4>
                    <h6>Name</h6>
                    <h6>Email</h6>
                    <input type="button" class="btn btn-secondary" value="Edit Profile" onClick={() => this.openModal()} />
                    <hr></hr>
                    <input type="button" class="btn btn-danger" value="Logout" onClick={() => this.openModal()} />

              </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <button id = "addeventbtn" type="button" class="addeventbtn btn btn-secondary btn-lg">Add Event +</button>
                </div>
            </div>
        </div>

        <footer id="footer" className="footer">
            <div>
            <p>Fiesta Copyright &copy; 2019. Ethan Niu, Shivangi Chand, Siddharth Dhar, Sripath Mishra, Pooja Tewari
            </p>
            </div>
        </footer>

             <section >
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div id="popup">
                        <h2>Edit Profile</h2>
                        <hr></hr>
                        <form >
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
                                </div>
                            </div>
                            </form>
                        <a href="javascript:void(0);" class="btn btn-outline-success" onClick={() => this.closeModal()}>Save</a>
                    </div>
                </Modal>
            </section>
    </div>

        );
    }
}
