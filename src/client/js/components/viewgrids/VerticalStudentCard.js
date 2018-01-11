import React from 'react';

export default class StudentCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  select(){
    this.props.addSelected(this.props.student._id);
  }

  render(){
    const selectedColour = "#99B3FF";
    //const selectedColour = "#ECB3FF"
    const locationStyle = {
      backgroundColor: this.props.selected ? selectedColour : "white",
        width: "100%",
        textAlign: "center",
        display: "block",
        padding: 10,
        border: "5px solid " + this.props.student.location.colour
    }
    const selectedStyle = {
      borderColor: 'lime',
    }
    var date = new Date(this.props.student.timelastout);
    return(
      <div style={locationStyle} onClick={this.select.bind(this)}>
        <div><p>{this.props.student.firstname} {this.props.student.surname} - {this.props.student.yeargroup} - {this.props.student.location.name}
        </p></div>
      </div>
    );
    // style={this.state.selected ? selectedStyle : null}
  }
}
