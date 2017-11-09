import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";

class Navbar extends React.Component{
  render(){
    return(
      <nav class="main-topnav">
        <img src="./assets/images/Logo Icon White.png" style={{float: "left", margin: 5, width: 36, height: 36}}/>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/history">History</NavLink>
        <NavLink to="/settings">Settings</NavLink>
          {this.props.user.user.data.role == 0 ? <NavLink to="/houses">Houses</NavLink> : null}
      </nav>
    );
  }
}

function mapStateToProps(state){
    return{ user: state.user}
}

export default connect(mapStateToProps)(Navbar);
