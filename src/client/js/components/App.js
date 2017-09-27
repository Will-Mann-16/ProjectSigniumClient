import React from "react";
import LoginPage from './LoginPage';
import MainSectionLayout from './MainSectionLayout';
import {connect} from 'react-redux';
import ViewPage from './ViewPage';
import {readUser} from "../actions/usersActions";
import {readLocations} from '../actions/locationsActions';
import {readStudentsMajor} from '../actions/studentsActions';
import {readHouses} from "../actions/housesActions";
import {activateListener} from "../socket";

class App extends React.Component {
  componentWillMount() {
    this.props.dispatch(readUser());
    this.props.dispatch(readHouses());
  }
  render() {
    if(this.props.user.fetching){
      return (<div class="loader"></div>)
    }
    else if(this.props.user.authenticated){
      this.props.dispatch(readStudentsMajor(this.props.user.user.data.house));
      this.props.dispatch(readLocations(this.props.user.user.data.house));
      activateListener(this.props.dispatch, this.props.user.user.data.house);
      if(localStorage.getItem("VIEW_TOKEN")){
        return(<ViewPage/>);
      }
      else{
        return(<MainSectionLayout/>);
      }
    }
    else if(this.props.user.fetched){
      return (<LoginPage/>);
    }
    return null;


  }
}
function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps)(App);
