import React from "react"
import {connect} from "react-redux"
import {withRouter, Redirect} from "react-router-dom"
import {createStudent, updateStudent} from "../actions/studentsActions"


class StudentPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      student: {},
      submitted: false,
      error: {input: "", message: ""}
    }
  }
  componentWillMount(){
    if(this.props.edit){
      this.props.students.students.map((student, key) => {
        if(this.props.studentID.toLowerCase() === student.code.toLowerCase()){
          this.setState({...this.state, student: student});
        }
      });
    }
    else{
      this.setState({...this.state, student: {_house: this.props.user.user.data.house, location: {id: null, name: "Undefined", colour: "#ffffff"}}});
    }
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({...this.state, student:{...this.state.student, [name]: value}});
  }
  handleLocationChange(event) {
    const value = event.target.value;
    var location;
    this.props.locations.locations.map((nlocation) => {
      if(nlocation._id === value){
        location = nlocation;
      }
    });
    this.setState({...this.state, student: {...this.state.student, location: {name:location.name, id: location._id, colour: location.colour}}});
  }
  handleHouseChange(event){
    const value = event.target.value;
    this.setState({...this.state, student: {_house: value}});
  }

  isSelected(yeargroup,text){
    if(this.props.edit && yeargroup === this.state.student.yeargroup){
      return(<option value={yeargroup} selected>{text}</option>);
    }
    else{
      return(<option value={yeargroup}>{text}</option>);
    }
  }
  submitData(){
    var unique = true;
    if(name === "code"){
      this.props.students.students.map((student) =>{
        if(student.code.toLowerCase() === this.state.student.code.toLowerCase()){
          unique = false;
        }
      })
    }
    if(unique || this.state.student.code.toLowerCase() === this.props.studentID.toLowerCase()){
      if(this.props.edit){
        this.props.dispatch(updateStudent(this.state.student._id, this.state.student));
      }else{
        this.props.dispatch(createStudent(this.state.student));
      }
      this.setState({...this.state, submitted: true});
    }
    else{
      this.setState({...this.state, error: {input: "code", message: "Code Already Taken"}});
    }
  }
  disableRole(role){
    if(role <= this.props.user.user.data.role){
      return true;
    }
    return false;
  }
  render(){
    if(this.state && this.state.submitted){
      return(<Redirect to="/students"/>);
    }
    var date = new Date(this.state.student.timelastout);
    console.log(this.props);
    var locationHTML = this.props.locations.locations.map((location, key) => {
        return(<option key={key} value={location._id} selected={this.props.edit && location._id === this.state.student.location.id} style={{backgroundColor: location.colour}}>{location.name}</option>);
    });
    var houseHTML = this.props.houses.houses.map((house, key) => {
      return (<option key={key} value={house._id} selected={house._id === this.state.student._house}>{house.name}</option>);
    });
      return(
        <div class="container row">
          <h3>Edit Student</h3>
          <div class="col-6">
          <div class="student-card-large">
            <div class="student-card-body-large" style={{borderColor: this.state.student.location ? this.state.student.location.colour : "white"}}>
                <p class="student-card-body-date">{date.toLocaleTimeString()}<br/>{date.toLocaleDateString()}</p>
                <p class="student-card-body-name">{this.state.student.firstname} {this.state.student.surname}</p>
                <div class="student-card-body-bottom"><p>{this.state.student.yeargroup}</p><br/>
                <p class="student-card-body-bottom">{this.state.student.location ? this.state.student.location.name : null}</p></div>
            </div>
          </div>
        </div>
          <div class="col-6">
            <input required class="form-input" onChange={this.handleChange.bind(this)} name="firstname" style={{borderColor: this.state.error.input !== "firstname" ? 'black': 'red'}} value={this.state.student.firstname} placeholder="Firstname" disabled={this.disableRole(2)}/>
            <input required class="form-input" onChange={this.handleChange.bind(this)} name="surname" style={{borderColor: this.state.error.input !== "surname" ? 'black': 'red'}} value={this.state.student.surname} placeholder="Surname" disabled={this.disableRole(2)}/>
            <input required class="form-input" onChange={this.handleChange.bind(this)} name="code" style={{borderColor: this.state.error.input !== "code" ? 'black': 'red'}} value={this.state.student.code} placeholder="Code" disabled={this.disableRole(2)}/>
            <input required class="form-input" onChange={this.handleChange.bind(this)} name="password" style={{borderColor: this.state.error.input !== "code" ? 'black': 'red'}} placeholder="Password" disabled={this.disableRole(2)}/>
            <select required class="form-input" name="yeargroup" onChange={this.handleChange.bind(this)} style={{borderColor: this.state.error.input !== "yeargroup" ? 'black': 'red'}} disabled={this.disableRole(2)}>
              {this.isSelected("3rd", "Third Form")}
              {this.isSelected("4th", "Fourth Form")}
              {this.isSelected("5th", "Fifth Form")}
              {this.isSelected("L6th", "Lower Sixth")}
              {this.isSelected("U6th", "Upper Sixth")}
            </select>
            <select required class="form-input" name="location" style={{backgroundColor: this.state.student.location ? this.state.student.location.colour : null, borderColor: this.state.error.input !== "location" ? 'black': 'red'}} onChange={this.handleLocationChange.bind(this)}>
              {locationHTML}
            </select>
            <select required class="form-input" name="house" style={{borderColor: this.state.error.input !== "house" ? 'black': 'red'}} onChange={this.handleHouseChange.bind(this)} disabled={this.disableRole(1)}>
              {houseHTML}
            </select>
            <button class="btn-green" onClick={this.submitData.bind(this)}>Submit</button>
          </div>
        </div>
      );
    }
}

function mapStateToProps(state){
  return {students: state.students, locations: state.locations, user: state.user, houses: state.houses}
}

export default connect(mapStateToProps)(StudentPage);
