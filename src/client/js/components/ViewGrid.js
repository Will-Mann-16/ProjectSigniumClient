import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { house } from '../socket';
import {selectStudent, deselectStudent, updateStudentLocation} from '../actions/studentsActions';

import StudentCard from './StudentCard';
import LocationButton from "./LocationButton";

class ViewGrid extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedDropped: false
    }
  }
  addSelected(id){
    var selectedIDs = this.props.students.selected;
    var index = selectedIDs.indexOf(id);
    if(index != -1){
      this.props.dispatch(deselectStudent(id));
    }else{
      this.props.dispatch(selectStudent(id));
    }
  }
  selectYear(id){
    this.props.students.students.forEach((student) => {
      if(student.yeargroup.toLowerCase() === id.toLowerCase()){
        this.addSelected(student._id);
      }
    });
  }
  deselectAll(){
      var selectedIDs = this.props.students.selected;
      selectedIDs.forEach((id) => {
        this.addSelected(id);
      });
  }
  toggleDropped(){
    this.setState({...this.state, selectedDropped: !this.state.selectedDropped});
  }
  updateLocation(buttonID){
    var selectedIDs = this.props.students.selected;
    this.props.dispatch(updateStudentLocation(selectedIDs, buttonID));
  }
  render(){
    var studentHTML = null;
    var locationHTML = null;
    studentHTML = this.props.students.students.map((student, key) => {
      if(this.props.students.selected.indexOf(student._id) != -1){
        return(<StudentCard selected view={this.props.view} student={student} key={key} addSelected={this.addSelected.bind(this)}/> );
      }
      else{
        return(<StudentCard view={this.props.view} student={student} key={key} addSelected={this.addSelected.bind(this)}/> );
      }
    });
      var noHeading = [], inCollege = [], outOfCollege = [];
      this.props.locations.locations.map((location, key) =>{
      switch(parseInt(location.heading)){
        case 0:
          noHeading.push(location);
          break;
        case 1:
          inCollege.push(location);
          break;
        case 2:
          outOfCollege.push(location);
          break;
        }
      });
    var noHeadingHTML = noHeading.map((location, key) => {
        if (key == 0) {
          return (<LocationButton break location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>);
        }
        return (<LocationButton location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>);
    });
    var inCollegeHTML = inCollege.map((location, key) => {
        if (key == 0) {
          return (<LocationButton break location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>);
        }
        return (<LocationButton location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>);
    });
    var outOfCollegeHTML = outOfCollege.map((location, key) => {
        if (key == 0) {
          return (<LocationButton break location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>);
        }
        return (<LocationButton location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>);
    });
    return(
      <div id="view-grid" class="row" style={{marginTop: this.props.view ? 0 : 50}}>
        <div class="col-10">
        {studentHTML}
      </div>
      <div class="col-2">
        <div class="accordian location-button" onClick={this.toggleDropped.bind(this)}>
          <div class="location-button-body">Select</div>
        </div>
        <div class="panel" style={{maxHeight: this.state.selectedDropped ? "none": 0}}>
          <button class="select-button" onClick={this.deselectAll.bind(this)}>Deselect All</button>
          <button class="select-button" onClick={this.selectYear.bind(this, "3RD")}>Third Form</button>
          <button class="select-button" onClick={this.selectYear.bind(this, "4TH")}>Forth Form</button>
          <button class="select-button" onClick={this.selectYear.bind(this, "5TH")}>Fifth Form</button>
          <button class="select-button" onClick={this.selectYear.bind(this, "L6TH")}>Lower Sixth</button>
          <button class="select-button" onClick={this.selectYear.bind(this, "U6TH")}>Upper Sixth</button>
        </div>
        {noHeadingHTML}
        {inCollegeHTML}
        {outOfCollegeHTML }
      </div>
    </div>
  );
  }
}

function mapStateToProps(state){
  return { students: state.students, locations: state.locations, user: state.user.user.data };
}

export default connect(mapStateToProps)(ViewGrid);
