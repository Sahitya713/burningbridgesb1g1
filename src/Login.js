import React, {Component} from "react"

import fire from './fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error)
        this.setState({error:"Email or Password is invalid."})
      });
  }

  // signup(e){
  //   e.preventDefault();
  //   fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
  //   }).then((u)=>{console.log(u)})
  //   .catch((error) => {
  //       console.log(error);
  //     })
  // }
  render() {
    return (
       <div className = "login_b">
       <form>
          <div>
            <label className = "email_l" htmlFor="exampleInputEmail1">Email address</label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div>
            <label className = "password_l" htmlFor="exampleInputPassword1">Password</label>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" id="password" placeholder="Password" />
          </div>
          <button className = "login" type="submit" onClick={this.login}>Login</button>
      {/* <button onClick={this.signup} style={{marginLeft: '25px'}} >Signup</button> */}
        </form>
        <div className = "error">{this.state.error}</div>
        </div>
      );
    }
}

//https://www.bennettnotes.com/react-login-with-google-firebase/
export default Login;