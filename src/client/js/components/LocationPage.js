import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {withRouter, Redirect} from "react-router-dom"
import {createLocation, updateLocation} from "../actions/locationsActions"
import {CirclePicker, SliderPicker} from "react-color"


class LocationPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      location: {},
      submitted: false,
      error: {input: "", message: ""}
    }
  }
  componentWillMount(){
    if(this.props.edit){
      this.props.locations.locations.map((location, key) => {
        if(this.props.locationID === location._id){
          this.setState({...this.state, location: location});
        }
      });
    }
    else{
      this.setState({...this.state, location:{...this.state.location, _house: this.props.user.user.data.house}});
    }
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({...this.state, location:{...this.state.location, [name]: value}});
  }
  handleChangeColour(colour){
    this.setState({...this.state, location: {...this.state.location, colour: colour.hex}});
  }
  submitData(){
    if(this.props.edit){
      this.props.dispatch(updateLocation(this.state.location._id, this.state.location));
    }else{
      this.props.dispatch(createLocation(this.state.location));
    }
    this.setState({...this.state, submitted: true});
  }
  disableRole(role){
    if(role >= this.props.user.user.data.role){
      return true;
    }
    return false;
  }
  handleHouseChange(event){
    const value = event.target.value;
    this.setState({...this.state, location: {_house: value}});
  }
  render(){
    if(this.state && this.state.submitted){
      return(<Redirect to="/locations"/>);
    }
      var studentHTML = this.props.students.students.map((student, key) =>{
        if(student.location.id !== this.state.location._id)
        {
          return null;
        }
        return(
          <li key={key}>{student.firstname} {student.surname}</li>
        );
      });
      var houseHTML = this.props.houses.houses.map((house, key) => {
        return (<option key={key} value={house._id} selected={house._id === this.state.location._house}>{house.name}</option>);
      });
      return(
        <div class="container row">
          <div class="col-6">
            <input required class="form-input" onChange={this.handleChange.bind(this)} name="name" value={this.state.location.name} placeholder="Name"/>
            <CirclePicker color={this.state.location.colour} onChangeComplete={this.handleChangeColour.bind(this)}/>
            <SliderPicker color={this.state.location.colour} onChangeComplete={this.handleChangeColour.bind(this)}/>
            <select required class="form-input" name="heading" onChange={this.handleChange.bind(this)}>
              <option value="0">No Heading</option>
              <option value="1">In College</option>
              <option value="2">Out of College</option>
            </select>
            <select required class="form-input" name="house" style={{borderColor: this.state.error.input !== "house" ? 'black': 'red'}} onChange={this.handleHouseChange.bind(this)} disabled={this.disableRole(1)}>
              {houseHTML}
            </select>
            <button class="btn-green" onClick={this.submitData.bind(this)}>Submit</button>
            <h6 style={{display: this.state.submitted ? 'block': 'none'}}>Success</h6>
          </div>
          {this.props.edit ? (<div class="col-6">
            <h3>Students currently in location</h3>
            <ul class="list">
              {studentHTML}
            </ul>
          </div>) : null}
        </div>
      );
    }
}

function mapStateToProps(state){
  return {students: state.students, locations: state.locations, user: state.user, houses: state.houses}
}

export default connect(mapStateToProps)(LocationPage);
