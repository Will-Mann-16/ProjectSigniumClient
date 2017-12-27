import React from "react"
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import {deleteStudent, uploadStudents} from "../actions/studentsActions"
import FileSaver from "file-saver";
import {Toggle} from "react-powerplug";
import XLSX from "xlsx";

class StudentListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: {
                search: "",
                yeargroup: [true, true, true, true, true],
                blackLocations: []
            }
        }
    }

    componentWillMount() {
        var locations = []
        this.props.locations.locations.forEach((location) => {
            locations.push({});
        })
    }

    delete(id) {
        this.props.dispatch(deleteStudent(id));
        var deleted = this.state.deleted.filter((i) => {
            return i !== id;
        });
        this.setState({...this.state, deleted: deleted});
    }


    downloadExcel() {
        var jsonArr = [];
        this.props.students.students.forEach((student) => {
            jsonArr.push({
                Firstname: student.firstname,
                Surname: student.surname,
                Yeargroup: student.yeargroup,
                Code: student.code.toUpperCase()
            });
        });
        var ws = XLSX.utils.json_to_sheet(jsonArr, {header: ["Firstname", "Surname", "Yeargroup", "Code", "Password"]});
        var wb = XLSX.utils.book_new();
        wb.SheetNames.push("Students")
        wb.Sheets["Students"] = ws;
        const s2ab = function (s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
        var wbout = XLSX.write(wb, wopts);
        FileSaver.saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "student_download.xlsx");
    }

    handleFileChange(e) {
        var files = e.target.files;
        for (var i = 0; i < files.length; i++) {
            var f = files[i];
            var reader = new FileReader();
            var name = f.name;
            var dispatch = this.props.dispatch;
            var house = this.props.user.house;
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {type: "binary"});
                var sheetName = workbook.SheetNames[0];
                var json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                dispatch(uploadStudents(json, house));
            }
            reader.readAsBinaryString(f);
        }
    }

    toggleYeargroup(yeargroup){
        var filter = this.state.filters.yeargroup;
        filter[yeargroup] = !filter[yeargroup];
        this.setState({...this.state, filters: {...this.state.filters, yeargroup: filter}});
    }
    blackListLocation(location){
        var filter = this.state.filters.blackLocations;
        if(filter.indexOf(location) == -1){
            filter.push(location);
        }
        else{
            filter.splice(location, 1);
        }
        this.setState({...this.state, filters: {...this.state.filters, blackLocations: filter}});
    }

    render() {
        const yeargroups = ["3rd", "4th", "5th", "l6th", "u6th"];
        const search = new RegExp(this.state.filters.search.toLowerCase(), "i");
        const studentHTML = this.props.students.students.map((student, key) => {
            var locationStyle = {
                color: 'white',
                backgroundColor: student.location.colour
            }
            var date = new Date(student.timelastout);
            var timeString = date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
            var link = "/students/" + student.code;
            var display = (search.test(student.firstname) || search.test(student.surname) || search.test(student.code) || search.test(student.yeargroup) || search.test(student.location) || search.test(timeString)) && this.state.filters.yeargroup[yeargroups.indexOf(student.yeargroup.toLowerCase())] && this.state.filters.blackLocations.indexOf(student.location.id) == -1;
            return display ? (<tr key={key}>
                <td>{student.firstname}</td>
                <td>{student.surname}</td>
                <td>{student.yeargroup}</td>
                <td>{student.code.toUpperCase()}</td>
                <td style={locationStyle}>{student.location.name}</td>
                <td>{timeString}</td>
                <td style={{textAlign: 'center'}}><Link to={link} style={{textDecoration: "none", color: "black"}}><i
                    class="fa fa-edit"></i></Link></td>
                <td style={{textAlign: 'center', height: "100%", position: "relative"}}>
                    <Toggle initial={false}>
                        {({on, toggle}) => {
                            return on ? (
                                <div class="btn-group"
                                     style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0}}>
                                    <button class="btn-green btn-icon-small" style={{width: "50%", height: "100%"}}
                                            onClick={this.delete.bind(this, student._id)}><i class="fa fa-trash"></i>
                                    </button>
                                    <button class="btn-red btn-icon-small" style={{width: "50%", height: "100%"}}
                                            onClick={toggle}><i class="fa fa-times"></i></button>
                                </div>
                            ) : (
                                <i class="fa fa-trash" onClick={toggle}></i>)
                        }}
                    </Toggle>
                </td>
            </tr>) : null;
        });
        return (
            <div class="container">
                <Toggle initial={false}>
                    {({on, toggle}) => {
                        var filterOn = on;
                        var filterToggle = toggle;
                        return (
                            <Toggle initial={false}>
                                {({on, toggle}) => {
                                    var uploadOn = on;
                                    var uploadToggle = toggle;
                                    return (
                                        <div>
                                            <div class="icon-bar">
                                                <Link to="/students/new"
                                                      style={{textDecoration: "none", color: "white"}}>Add <i
                                                    class="fa fa-plus-square"></i></Link>
                                                <a onClick={this.downloadExcel.bind(this)}>Download <i
                                                    class="fa fa-cloud-download"></i></a>
                                                <a onClick={uploadToggle}>Upload <i class="fa fa-cloud-upload"></i></a>
                                                <a onClick={filterToggle}>Filter <i class="fa fa-filter"></i></a>
                                            </div>
                                            {uploadOn && <div style={{width: "100%", margin: 5}}>
                                                <input type="file"
                                                       style={{padding: 10, transitionDuration: 2, textAlign: "center"}}
                                                       onChange={this.handleFileChange.bind(this)}/>
                                            </div>}
                                            {filterOn && <div class="row">
                                                <input class="col-4 input" name="search" placeholder="Search" onChange={(e) => this.setState({...this.state, filters: {...this.state.filters, search: e.target.value}})}/>
                                                <div class="col-4">
                                                    <label class="checkbox">3rd
                                                        <input type="checkbox" onChange={this.toggleYeargroup.bind(this, 0)}
                                                               checked={this.state.filters.yeargroup[0] ? "checked" : null}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    <label class="checkbox">4th
                                                        <input type="checkbox" onChange={this.toggleYeargroup.bind(this, 1)}
                                                               checked={this.state.filters.yeargroup[1] ? "checked" : null}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    <label class="checkbox">5th
                                                        <input type="checkbox" onChange={this.toggleYeargroup.bind(this, 2)}
                                                               checked={this.state.filters.yeargroup[2] ? "checked" : null}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    <label class="checkbox">L6th
                                                        <input type="checkbox" onChange={this.toggleYeargroup.bind(this, 3)}
                                                               checked={this.state.filters.yeargroup[3] ? "checked" : null}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                    <label class="checkbox">U6th
                                                        <input type="checkbox" onChange={this.toggleYeargroup.bind(this, 4)}
                                                               checked={this.state.filters.yeargroup[4] ? "checked" : null}/>
                                                        <span class="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div class="col-4">
                                                    {this.props.locations.locations.map((location, key) => {
                                                        return (
                                                            <label class="checkbox" key={key}
                                                                   style={{color: location.colour}}>{location.name}
                                                                <input type="checkbox" onChange={this.blackListLocation.bind(this, location._id)} checked={this.state.filters.blackLocations.indexOf(location._id) == -1 ? "checked" : null}/>
                                                                <span class="checkmark"></span>
                                                            </label>
                                                        )
                                                    })}
                                                </div>
                                            </div>}
                                        </div>
                                    )
                                }}
                            </Toggle>
                        )
                    }}
                </Toggle>
                <table class="table">
                    <tbody>
                    <tr>
                        <th>
                            Firstname
                        </th>
                        <th>
                            Surname
                        </th>
                        <th>
                            Yeargroup
                        </th>
                        <th>
                            Code
                        </th>
                        <th>
                            Location
                        </th>
                        <th>
                            Last Signed Out
                        </th>
                        <th style={{textAlign: 'center'}}>
                            Edit
                        </th>
                        <th style={{textAlign: 'center'}}>
                            Delete
                        </th>
                    </tr>
                    {studentHTML}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.students,
        user: state.user.user.data,
        locations: state.locations
    }
}

export default connect(mapStateToProps)(StudentListPage);
