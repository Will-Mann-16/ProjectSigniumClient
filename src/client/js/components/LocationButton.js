import React from "react";

export default class LocationButton extends React.Component{
  handleClick(){
    var thisLocation = this.props.location;
    this.props.updateLocation(thisLocation);
  }
  render(){
    var locationStyle = {
      backgroundColor: this.props.location.colour
    }
    const headingHTML = () => {
      switch(this.props.location.heading){
        case "0":
        return null;
        break;
        case "1":
        return (<div><h4 style={{textAlign: "center", marginTop: 10}}>In College</h4></div>);
        break;
        case "2":
        return (<div><h4 style={{textAlign: "center", marginTop: 10}}>Out of College</h4></div>);
        break;
      }
    }
    const breakHTML = this.props.break ? headingHTML() : null;
    return(
      <div>
        {breakHTML}
      <div class="location-button" style={locationStyle} onClick={this.handleClick.bind(this)}>
        <div class="location-button-body">
          {this.props.location.name}
        </div>
      </div>
    </div>
    );
  }
}
