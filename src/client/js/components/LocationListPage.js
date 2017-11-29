import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {deleteLocation, updateLocation} from "../actions/locationsActions"

class LocationListPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      deleted: []
    }
  }
  promptDelete(id){
    var deleted = this.state.deleted;
    deleted.push(id);
    this.setState({...this.state, deleted: deleted});
  }
  removeDelete(id){
    var deleted = this.state.deleted.filter((i) => {
      return i !== id;
    });
    this.setState({...this.state, deleted: deleted});
  }
  delete(id){
    this.props.dispatch(deleteLocation(id));
    var deleted = this.state.deleted.filter((i) => {
      return i !== id;
    });
    this.setState({...this.state, deleted: deleted});
  }
  changeOrderUp(location, list){
    if(list.indexOf(location) > 0){
      var index = list.indexOf(location);
      var aboveLoc = list[index - 1];
      var order = aboveLoc.order;
      aboveLoc.order = location.order;
      location.order = order;
      this.props.dispatch(updateLocation(aboveLoc._id, aboveLoc));
      this.props.dispatch(updateLocation(location._id, location));
    }
  }
  changeOrderDown(location, list){
        if(list.indexOf(location) < list.length - 1){
            var index = list.indexOf(location);
            var belowLoc = list[index + 1];
            var order = belowLoc.order;
            belowLoc.order = location.order;
            location.order = order;
            this.props.dispatch(updateLocation(belowLoc._id, belowLoc));
            this.props.dispatch(updateLocation(location._id, location));
        }
    }
  render(){
      const LocationRow = ({location, list, key}) => {
          var locationStyle = {
              color: 'white',
              backgroundColor: location.colour
          }
          var link = "/locations/" + location._id;
          var deleteHTML = this.state.deleted.indexOf(location._id) != -1 ? (
              <div class="btn-group" style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0}}>
                <button class="btn-green btn-icon-small" style={{width: "50%", height: "100%"}} onClick={this.delete.bind(this, location._id)}><i class="fa fa-trash"></i></button>
                <button class="btn-red btn-icon-small" style={{width: "50%", height: "100%"}} onClick={this.removeDelete.bind(this, location._id)}><i class="fa fa-times"></i></button>
              </div>
          ) : (
              <i class="fa fa-trash" onClick={this.promptDelete.bind(this, location._id)}></i>
          );
          var headingHTML = () =>{
              switch(location.heading){
                  case 0 + "":
                      return "No Heading";
                      break;
                  case 1 + "":
                      return "In College";
                      break;
                  case 2 + "":
                      return "Out of College";
                      break;

              }
          }
          return (<tr key={key}>
            <td>{location.name}</td>
            <td>{headingHTML()}</td>
            <td style={locationStyle}>{location.colour}</td>
            <td style={{textAlign: 'center'}}><Link to={link} style={{textDecoration: "none", color: "black"}}><i class="fa fa-edit"></i></Link></td>
            <td style={{textAlign: 'center', height: "100%", position: "relative"}}>{deleteHTML}</td>
            <td style={{textAlign: 'center', height: "100%", position: "relative"}}><div class="btn-group" style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0}}><button class="btn-african-sapphire btn-icon-small" onClick={this.changeOrderUp.bind(this, location, list)} style={{width: "50%", height: "100%"}}><i class="fa fa-arrow-circle-o-up"></i></button><button class="btn-african-sapphire btn-icon-small"  onClick={this.changeOrderDown.bind(this, location, list)} style={{width: "50%", height: "100%"}}><i class="fa fa-arrow-circle-o-down"></i></button></div></td>
          </tr>);
      };
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
          return (<LocationRow location={location} list={noHeading} key={key}/>);
      });
      var inCollegeHTML = inCollege.map((location, key) => {
          return (<LocationRow location={location} list={inCollege} key={key}/>);
      });
      var outOfCollegeHTML = outOfCollege.map((location, key) => {
          return (<LocationRow location={location} list={outOfCollege} key={key}/>);
      });
    return(
      <div class="container">
        <div class="icon-bar">
          <Link to="/locations/new" style={{textDecoration: "none", color: "white"}}>Add <i class="fa fa-plus-square"></i></Link>
          <a>Filter <i class="fa fa-filter"></i></a>
        </div>
        <table class="table">
          <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Heading
            </th>
            <th>
              Colour
            </th>
            <th style={{textAlign: 'center'}}>
              Edit
            </th>
            <th style={{textAlign: 'center'}}>
              Delete
            </th>
            <th style={{textAlign: 'center'}}>
              Reorder
            </th>
          </tr>
          {noHeadingHTML}
          <tr><td colSpan={6}><h4>IN COLLEGE</h4></td></tr>
          {inCollegeHTML}
          <tr><td colSpan={6}><h4>OUT OF COLLEGE</h4></td></tr>
          {outOfCollegeHTML}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    locations: state.locations
  }
}

export default connect(mapStateToProps)(LocationListPage);
