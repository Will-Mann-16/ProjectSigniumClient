import React from "react"
import {connect} from "react-redux"
import {createUser, updateUser, logoutUser} from "../actions/usersActions"

class UserSettings extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
        user: {},
        password: "",
        cpassword: "",
        perror: false,
        submitted: false
      }
  }
  componentWillMount(){
    if(this.props.edit){
      this.setState({...this.state, user: this.props.user.user.data});
    }
    else{
      this.setState({...this.state, user: {role: this.props.user.user.data.role, _house: this.props.user.user.data.house}});
    }
  }
  handleChange(event){
    var name = event.target.name;
    var value = event.target.value;
    this.setState({...this.state, user:{...this.state.user, [name]: value}});
  }
  handleHouseChange(event){
    const value = event.target.value;
    this.setState({...this.state, user: {...this.state.user, _house: value}});
  }
  handleRoleChange(event){
    const value = event.target.value;
    this.setState({...this.state, user: {...this.state.user, role: value}});
  }
  handlePasswordChange(event){
    const value = event.target.value;
    const name = event.target.name;
    if(name === "password"){
      this.setState({...this.state, password: value});
    }
    else{
      this.setState({...this.state, cpassword: value});
    }
  }
  disableRole(role){
    if(role <= this.props.user.user.data.role){
      return true;
    }
    return false;
  }
  logout(){
    this.props.dispatch(logoutUser());
  }
  updateUser(){
    if(this.state.password === ""){
      this.setState({...this.state, submitted: true});
    }
    else if(this.state.password === this.state.cpassword){
      this.setState({...this.state, user: {...this.state.user, password: this.state.password}, submitted: true});
    }

  }
  viewToken(){
    localStorage.setItem("VIEW_TOKEN", true);
  }
  componentDidUpdate(){
    if(this.state.submitted){
      if(this.props.edit){
        this.props.dispatch(updateUser(this.props.user.user.data._id, this.state.user));
      }
      else{
        this.props.dispatch(createUser(this.state.user));
      }
    }
  }
  render(){
    const roleList = ["SuperAdmin", "Admin", "HM", "Tutor"];
    const roleHTML = roleList.map((role, key) => {
          return (<option key={key} value={key} disabled={this.disableRole(key + 1)} selected={this.state.user.role == key}>{role}</option>);
    });
    const houseHTML = this.props.houses.houses.map((house, key) => {
      return (<option key={key} value={house._id} selected={house._id === this.props.user.user.data.house}>{house.name}</option>);
    });
    return(
      <div>
        <input required class="form-input" name="firstname" placeholder="Firstname" onChange={this.handleChange.bind(this)} value={this.state.user.firstname}/>
        <input required class="form-input" name="surname" placeholder="Surname" onChange={this.handleChange.bind(this)} value={this.state.user.surname}/>
        <input required class="form-input" name="username" placeholder="Username" onChange={this.handleChange.bind(this)} value={this.state.user.username}/>
        <input required class="form-input" type="password" style={{borderColor: this.state.password !== this.state.cpassword ? "red" : "black"}} name="password" placeholder="Password" onChange={this.handlePasswordChange.bind(this)}/>
        <input required class="form-input" type="password" style={{borderColor: this.state.password !== this.state.cpassword ? "red" : "black"}} name="cpassword" placeholder="Confirm Password" onChange={this.handlePasswordChange.bind(this)}/>
        <select required class="form-input" name="role" disabled={this.disableRole(1)}  onLoadStart={this.handleHouseChange.bind(this)} onChange={this.handleRoleChange.bind(this)} value={this.state.user.role}>
          {roleHTML}
        </select>
        <select required class="form-input" name="house" onChange={this.handleHouseChange.bind(this)} disabled={this.disableRole(1)}>
          {houseHTML}
        </select>
        <button class="btn-green" onClick={this.updateUser.bind(this)}>Update</button>
        {this.props.edit ? <div><button class="btn-red" onClick={this.logout.bind(this)}>Logout</button><button class="btn-blue" onClick={this.viewToken.bind(this)}>Make View User</button></div> : null}
      </div>
    )
  }
}
function mapStateToProps(state){
  return{
    user: state.user,
    houses: state.houses
  }
}
export default connect(mapStateToProps)(UserSettings)
