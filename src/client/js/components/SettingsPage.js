import React from "react"
import { connect } from "react-redux"

import UserSettings from "./UserSettings"

class SettingsPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activePage: 0
    }
  }

  changeActivePage(pageID){
    this.setState({activePage: pageID});
  }
  disableRole(role){
    if(role <= this.props.user.user.data.role){
      return true;
    }
    return false;
  }

  renderCurrentPage(){
    switch(this.state.activePage){
      case 0:
        return(
          <div class="col-10">
            <UserSettings key="edit" edit/>
          </div>
        );
      case 1:
        return(
          <div class="col-10">
            <UserSettings key="new"/>
          </div>
        );
    }
  }

  render(){
    return(
      <div class="container row">
        <div class="col-2">
          <ul class="list">
            <li onClick={this.changeActivePage.bind(this, 0)} class={this.state.activePage == 0 ? "active" : null}>User Settings</li>
            <li onClick={this.changeActivePage.bind(this, 1)} class={this.state.activePage == 0 ? "active" : null}>New User</li>
          </ul>
        </div>
        {this.renderCurrentPage()}
        </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}
export default connect(mapStateToProps)(SettingsPage);
