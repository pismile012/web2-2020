import React, { Component } from 'react'

export default class NavMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            fullName: "",
            id: null,
            login: false,
            token: null,
            store: null,

            status: "",

            username: null,
            password: null,
            email: null,
            bankBranchId: 1,
            dOB: null,
            sex: 1,
            phone: null
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log("FETCHING LOGIN: ");
        fetch("https://s-ebanking-api.herokuapp.com/customers/login", 
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log("RESULT: ");
                console.warn(result);

                this.setState({
                    status: result.message,
                });

                if(result.token){
                    localStorage.setItem("login", JSON.stringify({
                        token: result.token,
                        login: true,
                        currentUser: result.customerId,
                    }));
                    this.storeCollectorLogin();
                    window.location.reload();
                }
                alert(this.state.status);
            })
            .catch(console.log("ERROR"));
        })
        .catch((err) => {
            console.log("Something went wrong when you fetch something!" + err);
        });
    }

    submitSignupHandler = (e) => {
        e.preventDefault();
        console.log("SIGN UP ACCOUNT");
        fetch("https://s-ebanking-api.herokuapp.com/customers/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                this.setState({
                    message: result.message
                });
                alert(result.message);
            })
            .catch((err) => {
                console.log("ERROR RESPONSE TO JSON RESULT SIGN UP! " + err);
            });
        })
        .catch((err) => {
            console.log("FETCH ERROR SIGN UP! " + err);
        });
    }

    storeCollectorLogin = () => {
        console.log("STORE COLLECTOR!!!");
        try{
            let store = JSON.parse(localStorage.getItem('login'));

            if(store && store.login){
                this.setState({
                    store,
                    login: true,
                    status: store.message
                });
            }
        }catch(err){
            console.log("FAILED WHEN you use store collector login ");
        }
        
    }

    logoutHandler = (e) => {
        localStorage.removeItem("login");
        window.location.reload();
    }

    componentDidMount(){
        console.log("COMPONENT DID MOUNT");
        this.storeCollectorLogin();
    }

    render() {
        return (
        
        <header id="header">
            <div className="container-fluid">
                <div id="logo" className="pull-left">
                    <h1><a href="#intro" className="scrollto">E-Banking</a></h1>
                    {/* Uncomment below if you prefer to use an image logo */}
                    {/* <a href="#intro"><img src="img/logo.png" alt="" title="" /></a>*/}
                </div>
                <nav id="nav-menu-container">
                    <ul className="nav-menu">
                        <li className="menu-active"><a href="/home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#team">Team</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li className="menu-has-children">
                            {
                                this.state.login?
                                <a href="/profile" style={{width: 'auto'}}>Hello, {this.props.fullName}</a>:
                                <a href="#" onClick={() => document.getElementById('id01').style.display='block'} style={{width: 'auto'}}>Login</a>
                            }
                            <div id="id01" className="modal">
                                <form className="modal-content animate" onSubmit={this.submitHandler}>
                                    <div className="imgcontainer">
                                        <span onClick={() => document.getElementById('id01').style.display='none'} className="close" title="Close Modal">×</span>
                                        <img src="img/clients/client-1.png" alt="Avatar" className="avatar" />
                                    </div>
                                    <div className="container row">
                                        <label htmlFor="uname"><b>Username</b></label>
                                        <input type="text" onChange={this.changeHandler} placeholder="Enter Username" name="username" required /><br />
                                        <label htmlFor="psw"><b>Password</b></label>
                                        <input type="password" onChange={this.changeHandler} placeholder="Enter Password" name="password" required /><br />
                                        <button className="btnSubmit" type="submit">Login</button><br />
                                        <label>
                                            <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
                                        </label>
                                    </div>
                                    <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                                        <button type="button" onClick={() => document.getElementById('id01').style.display='none'} className="cancelbtn">Cancel</button>
                                        <span className="psw">Forgot <a style={{color:"black"}} href="#">password?</a></span>   
                                    </div>
                                </form>
                            </div>
                        </li>
                        {
                            this.state.login?<li><a href="#" onClick={this.logoutHandler}>Log out</a></li>:
                            <li>
                                <a href="#" onClick={() => document.getElementById('id02').style.display="block"}>Sign up</a>
                                <div id="id02" className="modal">
                                <form className="modal-content animate" onSubmit={this.submitSignupHandler}>
                                    <div className="imgcontainer">
                                        <span onClick={() => document.getElementById('id02').style.display='none'} className="close" title="Close Modal">×</span>
                                        <img src="img/clients/client-1.png" alt="Avatar" className="avatar" />
                                    </div>
                                    <div className="container row">
                                        <label htmlFor="username"><b>Username:      </b></label>
                                        <input className="col-13" type="text" onChange={this.changeHandler} placeholder="Enter Username" name="username" required />
                                        <label htmlFor="password"><b>Password:        </b></label>
                                        <input className="col-13" type="password" onChange={this.changeHandler} placeholder="Enter Password" name="password" required />
                                        <label htmlFor="comfirmPassword"><b>Comfirm Password: </b></label>
                                        <input type="password" onChange={this.changeHandler} placeholder="Enter comfirm Password" name="comfirmPassword" required />
                                        <label htmlFor="email"><b>Email:            </b></label>
                                        <input type="email" onChange={this.changeHandler} placeholder="Enter Your Email" name="email" required />
                                        <label htmlFor="fullName"><b>Full Name:            </b></label>
                                        <input type="text" onChange={this.changeHandler} placeholder="Enter Your Full Name" name="fullName" required /><br />
                                        <label htmlFor="phone"><b>Phone:            </b></label>
                                        <input type="text" onChange={this.changeHandler} placeholder="Enter Your Phone Number" name="phone" required /><br />

                                        
                                        <label style={{marginTop: "20px"}} className="col-2" htmlFor="dOB"><b>Date of Birth:            </b></label>
                                        <input style={{marginTop: "20px"}} className="col-10" type="date" onChange={this.changeHandler} placeholder="Enter Your Birth Day" name="dOB" required />
                                        

                                        <label style={{marginTop: "40px"}} className="col-1" htmlFor="sex"><b>Sex:            </b></label>
                                        <select onChange={this.changeHandler} style={{marginTop: "40px"}} className="col-1" name="sex">
                                            <option value="1">Female</option>
                                            <option value="0">Male</option>
                                        </select>
                                        

                                        <label style={{marginTop: "40px"}} className="col-2" htmlFor="bankBranchId"><b>Ngân hàng:            </b></label>
                                        <select onChange={this.changeHandler} style={{marginTop: "40px"}} className="col-8" name="bankBranchId">
                                            <option value="1">Ngân hàng Á Châu (ACB) - Chi nhánh Gò Vấp</option>
                                            <option value="2">Ngân hàng Á Châu (ACB) - Chi nhánh quận 1</option>
                                            <option value="3">Ngân hàng Á Châu (ACB) - Chi nhánh quận 2</option>
                                            <option value="4">Ngân hàng Sacombank (SCB) - Chi nhánh Gò Vấp</option>
                                            <option value="5">Ngân hàng Sacombank (SCB) - Chi nhánh quận 1</option>
                                            <option value="6">Ngân hàng Sacombank (SCB) - Chi nhánh quận 2</option>
                                        </select>

                                        <button onClick={this.submitSignupHandler} className="btnSubmit" type="submit">Signup</button>
                                        <label>
                                            <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
                                        </label>

                                    </div>
                                    <div className="container row" style={{backgroundColor: '#f1f1f1'}}>
                                        <button className="col-4" type="button" onClick={() => document.getElementById('id02').style.display='none'} className="cancelbtn">Cancel</button>
                                        <span className="psw col-8">Forgot <a style={{color: "black"}} href="#">password?</a></span>   
                                    </div>
                                </form>
                            </div>
                            </li>
                        }
                        
                    </ul>
                </nav>
            </div>
        </header>
        )
    }
}
