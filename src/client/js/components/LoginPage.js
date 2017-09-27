import React from "react";
import {connect} from "react-redux";
import {authenticateUser} from "../actions/usersActions";

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  submitLogin() {
    this.props.dispatch(authenticateUser(this.state.username,this.state.password));
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({[name]: value});
  }
  render() {
    return (
      <div class="container">
        <h1 style={{textAlign: "center"}}>Welcome to RIDGE</h1>
        <h3>Login</h3>
        <input name="username" type="text" placeholder="Username" class="form-input" onChange={this.handleChange.bind(this)}></input>
        <input name="password" type="password" placeholder="Password" class="form-input" onChange={this.handleChange.bind(this)}></input>
        <button class="btn-green" onClick={this.submitLogin.bind(this)}>Login</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps)(LoginPage);
