import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { changeUserHouse } from "../actions/usersActions";
import { readStudentsMajor } from "../actions/studentsActions";
import { readLocations } from "../actions/locationsActions";
import { readHouses, deleteHouse } from "../actions/housesActions";

class HousesListPage extends React.Component{
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
        this.props.dispatch(deleteHouse(id));
        var deleted = this.state.deleted.filter((i) => {
            return i !== id;
        });
        this.setState({...this.state, deleted: deleted});
    }
    changeHouse(house){
        this.props.dispatch(changeUserHouse(house));
        this.props.dispatch(readStudentsMajor(house));
        this.props.dispatch(readLocations(house));
    }
    render(){
        const houseHTML = this.props.houses.houses.map((house, key) => {
            const personell = house.personell.map((person, key) => {
               return(<p key={key}>{person}</p>);
            });
            const colours = house.colours.map((colour, key) => {
                return(<div key={key} style={{backgroundColor: colour, padding: 15, display: "inline", border: "3px #555 solid", height: "100%", margin: 0}}></div>)
            });
            var deleteHTML = this.state.deleted.indexOf(house._id) != -1 ? (
                <div class="btn-group" style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0}}>
                    <button class="btn-green btn-icon-small" style={{width: "50%", height: "100%"}} onClick={this.delete.bind(this, house._id)}><i class="fa fa-trash"></i></button>
                    <button class="btn-red btn-icon-small" style={{width: "50%", height: "100%"}} onClick={this.removeDelete.bind(this, house._id)}><i class="fa fa-times"></i></button>
                </div>
            ) : (
                <i class="fa fa-trash" onClick={this.promptDelete.bind(this, house._id)}></i>
            );
            var link = "/houses/" + house._id;
            return(<tr key={key}>
                <td>{house.name}</td>
                <td>{personell}</td>
                <td style={{textAlign: "center"}}>{colours}</td>
                <td style={{textAlign: 'center'}}><Link to={link} style={{textDecoration: "none", color: "black"}}><i class="fa fa-edit"></i></Link></td>
                <td style={{textAlign: 'center', height: "100%", position: "relative"}}>{deleteHTML}</td>
                <td style={{textAlign: 'center', height: "100%"}}>{this.props.user.user.data.house === house._id ? <button class="btn-gray" onClick={null}>Selected</button> : <button class="btn-blue" onClick={this.changeHouse.bind(this, house._id)}>Select</button>}</td>
            </tr>);
        });
        return(
            <div class="container">
                <div class="icon-bar">
                    <Link to="/houses/new" style={{textDecoration: "none", color: "white"}}>Add <i class="fa fa-plus-square"></i></Link>
                    <a>Filter <i class="fa fa-filter"></i></a>
                </div>
                <table class="table">
                    <tbody>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Personell
                        </th>
                        <th style={{textAlign: 'center'}}>
                            Colours
                        </th>
                        <th style={{textAlign: 'center'}}>
                            Edit
                        </th>
                        <th style={{textAlign: 'center'}}>
                            Delete
                        </th>
                        <th style={{textAlign: 'center'}}>
                            Active
                        </th>
                    </tr>
                    {houseHTML}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {houses: state.houses, user: state.user}
}

export default connect(mapStateToProps)(HousesListPage);