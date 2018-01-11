import React from 'react';
import {connect} from 'react-redux';
import {Toggle} from "react-powerplug"
import {house} from '../../socket';
import {selectStudent, deselectStudent, updateStudentLocation} from '../../actions/studentsActions';

import VerticalStudentCard from "./VerticalStudentCard"
import LocationButton from "../LocationButton";

class ViewGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    addSelected(id) {
        var selectedIDs = this.props.students.selected;
        var index = selectedIDs.indexOf(id);
        if (index != -1) {
            this.props.dispatch(deselectStudent(id));
        } else {
            this.props.dispatch(selectStudent(id));
        }
        this.setState({...this.state, selected: true});
    }

    selectYear(id) {
        this.props.students.students.forEach((student) => {
            if (student.yeargroup.toLowerCase() === id.toLowerCase()) {
                this.addSelected(student._id);
            }
        });
    }

    deselectAll() {
        var selectedIDs = this.props.students.selected;
        selectedIDs.forEach((id) => {
            this.addSelected(id);
        });
    }

    toggleDropped() {
        this.setState({...this.state, selectedDropped: !this.state.selectedDropped});
    }

    updateLocation(buttonID) {
        var selectedIDs = this.props.students.selected;
        this.props.dispatch(updateStudentLocation(selectedIDs, buttonID));
        this.setState({...this.state,  selected: false});
    }

    render() {
        var studentHTML = null;
        var locationHTML = null;
        studentHTML = this.props.students.students.map((student, key) => {
            return (<VerticalStudentCard selected={this.props.students.selected.indexOf(student._id) != -1}
                                         view={this.props.view} student={student} key={key}
                                         addSelected={this.addSelected.bind(this)}/> );
        });
        var noHeading = [], inCollege = [], outOfCollege = [];
        this.props.locations.locations.map((location, key) => {
            switch (parseInt(location.heading)) {
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
            return (<LocationButton location={location} break={key == 0} key={key}
                                    updateLocation={this.updateLocation.bind(this)}/>);
        });
        var inCollegeHTML = inCollege.map((location, key) => {
            return (<LocationButton break={key == 0} location={location} key={key}
                                    updateLocation={this.updateLocation.bind(this)}/>);
        });
        var outOfCollegeHTML = outOfCollege.map((location, key) => {
            return (<LocationButton break={key == 0} location={location} key={key}
                                    updateLocation={this.updateLocation.bind(this)}/>);
        });
        if (!this.state.selected) {
            return (
                <div style={{marginTop: this.props.view ? 0 : 50}}>
                    {studentHTML}
                </div>);
        }
        else {
            return (
                <div>
                    {noHeadingHTML}
                    {inCollegeHTML}
                    {outOfCollegeHTML}
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {students: state.students, locations: state.locations, user: state.user.user.data};
}

export default connect(mapStateToProps)(ViewGrid);
