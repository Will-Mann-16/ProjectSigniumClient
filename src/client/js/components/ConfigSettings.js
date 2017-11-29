import React from "react"
import { connect } from "react-redux"
import { modifyHouseConfig } from "../actions/housesActions";

class ConfigSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            config: [],
            submittable: false,
            defaultLocation: {
                location: {},
                id: ""
            }
        }
    }
    componentWillMount(){
        this.props.houses.houses.forEach((house) => {
           if(house._id === this.props.user.user.data.house){
               var location = this.props.locations.locations.map((location, key) => {
                   if(location._id === house.config.DEFAULT_LOCATION){
                       this.setState({...this.state, submittable: true});
                       return location;
                   }
               });
               this.setState({...this.state, defaultLocation: {id: house.config.DEFAULT_LOCATION, location: location}})
           }
        });
    }

    handleDefaultLocationChange(e){
        var val = e.target.value;
        var location = {};
        location = this.props.locations.locations.map((location, key) => {
            if(location._id === val){
                return location;
            }
        });
        this.setState({...this.state, submittable: true,  defaultLocation: {id: val, location: location}});
    }


    saveConfig(){
        var defaultLocation = this.state.defaultLocation.id;

        var result = {DEFAULT_LOCATION: defaultLocation};
        if(this.state.submittable){
            this.props.dispatch(modifyHouseConfig(this.props.user.user.data.house, result));
        }
    }

    render(){
        var locationHTML = this.props.locations.locations.map((location, key) => {
            return(<option key={key} value={location._id} selected={this.state.defaultLocation.id === location._id} style={{backgroundColor: location.colour, color: "white"}}>{location.name}</option>);
        });
        return(
            <div class="container">
                <div class="config-option">
                    <h5>Default Location:</h5>
                    <select required class="form-input" name="conf-default-location" style={{backgroundColor: this.state.defaultLocation.location.colour, borderColor: this.state.submittable ? "black" : "red"}} onChange={this.handleDefaultLocationChange.bind(this)}>
                        {locationHTML}
                    </select>
                </div>
                <button class="btn-green" onClick={this.saveConfig.bind(this)}>Save</button>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        user: state.user,
        houses: state.houses,
        locations: state.locations
    }
}

export default connect(mapStateToProps)(ConfigSettings);