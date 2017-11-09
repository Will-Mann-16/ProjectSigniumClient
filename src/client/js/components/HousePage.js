import React from "react"
import { connect } from "react-redux"
import { SketchPicker } from "react-color"
import { createHouse, updateHouse } from "../actions/housesActions"
import { Redirect } from "react-router-dom"

class HousePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            house: {
                name: "",
                personell: [],
                colours: []
            },
            newPersonText: "",
            newColour: "",
            togglePerson: false,
            toggleColour: false,
            submitted: false
        }
    }
    componentWillMount(){
        if(this.props.edit){
            this.props.houses.houses.map((house, key) => {
                if(this.props.houseID === house._id){
                    this.setState({...this.state, house: house});
                }
            });
        }
    }
    addHouse(){
            if(this.props.edit){
                this.props.dispatch(updateHouse(this.state.house._id, this.state.house));
            }else{
                this.props.dispatch(createHouse(this.state.house));
            }
            this.setState({...this.state, submitted: true});
    }
    updatePerson(e){
        var value = e.target.value;
        this.setState({...this.state, newPersonText: value});
    }

    addPersonToList(){
        var personell = this.state.house.personell;
        personell.push(this.state.newPersonText);
        this.setState({...this.state, house: {...this.state.house, personell: personell}});
    }
    addColourToList(){
        var colours = this.state.house.colours;
        colours.push(this.state.newColour.hex );
        this.setState({...this.state, house: {...this.state.house, colours: colours}});
    }
    removePerson(person){
        var personell = this.state.house.personell;
        personell.splice(personell.indexOf(person), 1);
        this.setState({...this.state, house: {...this.state.house, personell: personell}});
    }
    removeColour(colour){
        var colours = this.state.house.colours;
        colours.splice(colours.indexOf(colour), 1);
        this.setState({...this.state, house: {...this.state.house, colours: colours}});
    }
    togglePerson(){
        this.setState({...this.state, togglePerson: !this.state.togglePerson});
    }
    toggleColour(){
        this.setState({...this.state, toggleColour: !this.state.toggleColour});
    }

    handleNameChange(e){
        var value = e.target.value;
        this.setState({...this.state, house: {...this.state.house, name: value}});
    }
    handleChangeColour(colour){
        this.setState({...this.state, newColour: colour});
    }
    render(){
            if(this.state && this.state.submitted){
                return(<Redirect to="/houses"/>);
            }
        return(
            <div class="container">
                <h3>{this.props.edit ? "Update" : "Create"} House</h3>
                <input class="form-input" value={this.state.house.name} onChange={this.handleNameChange.bind(this)} placeholder="Name"/>
                <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", width: "100%"}}>
                    {this.state.house.personell.map((person, key) => (<p class="btn-black-onyx" onClick={this.removePerson.bind(this, person)} style={{flexGrow: 1, flexBasis: "100%"}} key={key}>{person}</p>))}
                    <button class="btn-blue" onClick={this.togglePerson.bind(this)} style={{flexGrow: 1, flexBasis: "100%"}}>{this.state.togglePerson ? "Close" : "Add Person"}</button>
                </div>
                {this.state.togglePerson ? <div class="row" style={{marginTop: 5}}><input style={{float: "left", width: "75%"}} class="input" type="text" placeholder="New Person" onChange={this.updatePerson.bind(this)}/><button class="btn-green" style={{float: "right", width: "25%"}} onClick={this.addPersonToList.bind(this)}>Add</button></div>: null}

                <div style={{display: "flex", alignItems: "stretch", justifyContent: "space-between", width: "100%", marginTop: 5}}>
                    {this.state.house.colours.map((colour, key) => (<p onClick={this.removeColour.bind(this, colour)} class="btn-black-onyx" style={{backgroundColor: colour, flexGrow: 1, flexBasis: "100%"}} key={key}></p>))}
                    <button class="btn-blue" onClick={this.toggleColour.bind(this)} style={{flexGrow: 1, flexBasis: "100%"}}>{this.state.toggleColour ? "Close" : "Add Colour"}</button>
                </div>
                {this.state.toggleColour ? <div class="row" style={{marginTop: 5}}>       <div style={{margin: "auto", maxWidth: 300}}><SketchPicker width={300} disableAlpha color={this.state.newColour} onChangeComplete={this.handleChangeColour.bind(this)}/>
                    <button class="btn-green" style={{width: "100%"}} onClick={this.addColourToList.bind(this)}>Add</button></div></div>: null}

                <button class="btn-green" style={{marginTop: 5}} onClick={this.addHouse.bind(this)}>{this.props.edit ? "Update" : "Create"}</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        houses: state.houses,
        user: state.user
    }
}

export default connect(mapStateToProps)(HousePage);